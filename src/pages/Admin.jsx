import { useEffect, useMemo, useState } from "react";
import {
    LogOut,
    Users,
    Check,
    X,
    RefreshCw,
    Trash2,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Admin() {
    const [session, setSession] = useState(null);
    const [rsvps, setRsvps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    function exportCsv() {
        if (rsvps.length === 0) {
            alert("There are no RSVPs to export.");
            return;
        }

        const headers = [
            "Name",
            "Phone",
            "Attendance",
            "Guests",
            "Message",
            "Submitted At",
        ];

        const rows = rsvps.map((rsvp) => [
            rsvp.name,
            rsvp.phone,
            rsvp.attendance === "yes"
                ? "Attending"
                : "Declined",
            rsvp.guests,
            rsvp.message || "",
            new Date(rsvp.created_at).toLocaleString(),
        ]);

        const csv = [
            headers,
            ...rows,
        ]
            .map((row) =>
                row
                    .map((value) =>
                        `"${String(value).replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "lionel-aline-wedding-rsvps.csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, currentSession) => {
                setSession(currentSession);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (session) {
            fetchRsvps();
        }
    }, [session]);

    async function getSession() {
        const {
            data: { session: currentSession },
        } = await supabase.auth.getSession();

        setSession(currentSession);
        setLoading(false);
    }

    async function fetchRsvps() {
        setLoading(true);
        setError("");

        const { data, error: fetchError } = await supabase
            .from("wedding_rsvps")
            .select("*")
            .order("created_at", { ascending: false });

        if (fetchError) {
            console.error(fetchError);
            setError("Unable to load RSVP responses.");
        } else {
            setRsvps(data || []);
        }

        setLoading(false);
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        setSession(null);
    }

    async function deleteRsvp(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this RSVP?"
        );

        if (!confirmed) return;

        const { error: deleteError } = await supabase
            .from("wedding_rsvps")
            .delete()
            .eq("id", id);

        if (deleteError) {
            alert("Unable to delete this RSVP.");
            return;
        }

        setRsvps((current) =>
            current.filter((rsvp) => rsvp.id !== id)
        );
    }

    const statistics = useMemo(() => {
        const responses = rsvps.length;

        const attending = rsvps.filter(
            (rsvp) => rsvp.attendance === "yes"
        ).length;

        const declined = rsvps.filter(
            (rsvp) => rsvp.attendance === "no"
        ).length;

        const totalGuests = rsvps
            .filter((rsvp) => rsvp.attendance === "yes")
            .reduce(
                (total, rsvp) => total + Number(rsvp.guests || 0),
                0
            );

        return {
            responses,
            attending,
            declined,
            totalGuests,
        };
    }, [rsvps]);

    const filteredRsvps = useMemo(() => {
        return rsvps.filter((rsvp) => {
            const matchesSearch =
                rsvp.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                rsvp.phone
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesFilter =
                filter === "all" ||
                rsvp.attendance === filter;

            return matchesSearch && matchesFilter;
        });
    }, [rsvps, search, filter]);

    if (loading && !session) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f5f2eb]">
                <p className="font-serif text-lg text-black/60">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (!session) {
        return <AdminLogin />;
    }

    return (
        <div className="min-h-screen bg-[#f5f2eb] text-[#171717]">

            {/* HEADER */}
            <header className="border-b border-black/10">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">

                    <div>
                        <p className="font-serif text-2xl sm:text-3xl">
                            Lionel & Aline
                        </p>

                        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-black/55">
                            Wedding RSVP
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/55 transition hover:text-black"
                    >
                        <LogOut size={15} strokeWidth={1.5} />
                        Logout
                    </button>

                </div>
            </header>

            {/* MAIN */}
            <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">

                {/* INTRO */}
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/55">
                        Guest Management
                    </p>

                    <h1 className="mt-5 font-serif text-4xl font-light sm:text-5xl">
                        RSVP Dashboard
                    </h1>

                    <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60">
                        Manage your wedding responses and keep track of the
                        guests joining you on your special day.
                    </p>
                </div>

                {/* STATISTICS */}
                <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    <StatCard
                        icon={<Users size={20} strokeWidth={1.5} />}
                        label="Responses"
                        value={statistics.responses}
                    />

                    <StatCard
                        icon={<Check size={20} strokeWidth={1.5} />}
                        label="Attending"
                        value={statistics.attending}
                    />

                    <StatCard
                        icon={<X size={20} strokeWidth={1.5} />}
                        label="Declined"
                        value={statistics.declined}
                    />

                    <StatCard
                        icon={<Users size={20} strokeWidth={1.5} />}
                        label="Total Guests"
                        value={statistics.totalGuests}
                    />

                </div>

                {/* RSVP TABLE */}
                <section className="mt-20">

                    <div className="flex flex-col gap-6">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/55">
                                    Guest Responses
                                </p>

                                <h2 className="mt-4 font-serif text-3xl font-light sm:text-4xl">
                                    All RSVPs
                                </h2>
                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={fetchRsvps}
                                    className="flex items-center gap-2 border border-black/15 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-black/60 transition hover:border-black/40 hover:text-black"
                                >
                                    <RefreshCw size={14} strokeWidth={1.5} />
                                    Refresh
                                </button>

                                <button
                                    onClick={exportCsv}
                                    className="bg-black px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#f5f2eb] transition hover:bg-black/80"
                                >
                                    Export CSV
                                </button>

                            </div>

                        </div>

                        {/* Search + filter */}
                        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">

                            <input
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search by name or phone..."
                                className="border border-black/10 bg-transparent px-5 py-4 text-sm outline-none placeholder:text-black/35 focus:border-black/30"
                            />

                            <select
                                value={filter}
                                onChange={(event) =>
                                    setFilter(event.target.value)
                                }
                                className="border border-black/10 bg-transparent px-5 py-4 text-sm outline-none"
                            >
                                <option value="all">
                                    All responses
                                </option>

                                <option value="yes">
                                    Attending
                                </option>

                                <option value="no">
                                    Declined
                                </option>
                            </select>

                        </div>

                        <p className="text-sm text-black/45">
                            Showing {filteredRsvps.length} of {rsvps.length} responses
                        </p>

                    </div>

                    {error && (
                        <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* DESKTOP */}
                    <div className="mt-10 hidden overflow-hidden border border-black/10 md:block">

                        <table className="w-full border-collapse">

                            <thead>
                                <tr className="border-b border-black/10 bg-black/[0.025] text-left">

                                    <th className="px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                                        Guest
                                    </th>

                                    <th className="px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                                        Phone
                                    </th>

                                    <th className="px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                                        Attendance
                                    </th>

                                    <th className="px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                                        Guests
                                    </th>

                                    <th className="px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                                        Message
                                    </th>

                                    <th className="px-6 py-5 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                                        Action
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {filteredRsvps.map((rsvp) => (
                                    <tr
                                        key={rsvp.id}
                                        className="border-b border-black/[0.07] last:border-0"
                                    >

                                        <td className="px-6 py-6 font-serif text-xl">
                                            {rsvp.name}
                                        </td>

                                        <td className="px-6 py-6 text-sm text-black/65">
                                            {rsvp.phone}
                                        </td>

                                        <td className="px-6 py-6">
                                            <AttendanceBadge
                                                attendance={rsvp.attendance}
                                            />
                                        </td>

                                        <td className="px-6 py-6 text-sm font-medium">
                                            {rsvp.guests}
                                        </td>

                                        <td className="max-w-[280px] px-6 py-6 text-sm leading-6 text-black/60">
                                            {rsvp.message || "—"}
                                        </td>

                                        <td className="px-6 py-6 text-right">
                                            <button
                                                onClick={() => deleteRsvp(rsvp.id)}
                                                className="text-black/40 transition hover:text-red-600"
                                                title="Delete RSVP"
                                            >
                                                <Trash2
                                                    size={17}
                                                    strokeWidth={1.5}
                                                />
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                        {filteredRsvps.length === 0 && (
                            <div className="px-6 py-20 text-center">
                                <p className="font-serif text-2xl text-black/45">
                                    {rsvps.length === 0
                                        ? "No RSVPs yet"
                                        : "No matching RSVPs"}
                                </p>

                                <p className="mt-2 text-sm text-black/45">
                                    {rsvps.length === 0
                                        ? "Responses will appear here when guests submit the form."
                                        : "Try changing your search or attendance filter."}
                                </p>
                            </div>
                        )}

                    </div>

                    {/* MOBILE */}
                    <div className="mt-10 space-y-4 md:hidden">

                        {filteredRsvps.map((rsvp) => (
                            <div
                                key={rsvp.id}
                                className="border border-black/10 bg-white/20 p-6"
                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div>
                                        <p className="font-serif text-2xl">
                                            {rsvp.name}
                                        </p>

                                        <p className="mt-2 text-sm text-black/55">
                                            {rsvp.phone}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => deleteRsvp(rsvp.id)}
                                        className="text-black/40 hover:text-red-600"
                                    >
                                        <Trash2
                                            size={17}
                                            strokeWidth={1.5}
                                        />
                                    </button>

                                </div>

                                <div className="mt-6 flex items-center justify-between">

                                    <AttendanceBadge
                                        attendance={rsvp.attendance}
                                    />

                                    <p className="text-sm text-black/60">
                                        {rsvp.guests}{" "}
                                        {Number(rsvp.guests) === 1
                                            ? "guest"
                                            : "guests"}
                                    </p>

                                </div>

                                {rsvp.message && (
                                    <p className="mt-6 border-t border-black/10 pt-5 text-sm leading-6 text-black/60">
                                        {rsvp.message}
                                    </p>
                                )}

                            </div>
                        ))}

                        {rsvps.length === 0 && (
                            <div className="border border-black/10 px-6 py-20 text-center">
                                <p className="font-serif text-2xl text-black/45">
                                    No RSVPs yet
                                </p>
                            </div>
                        )}

                    </div>

                </section>

            </main>
        </div >
    );
}

/* STAT CARD */

function StatCard({ icon, label, value }) {
    return (
        <div className="border border-black/10 bg-white/10 p-7 sm:p-8">

            <div className="text-black/45">
                {icon}
            </div>

            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-black/55">
                {label}
            </p>

            <p className="mt-3 font-serif text-4xl font-light sm:text-5xl">
                {value}
            </p>

        </div>
    );
}

/* ATTENDANCE BADGE */

function AttendanceBadge({ attendance }) {
    const attending = attendance === "yes";

    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] ${attending
                ? "bg-black text-[#f5f2eb]"
                : "border border-black/15 text-black/55"
                }`}
        >
            {attending ? (
                <Check size={12} strokeWidth={1.8} />
            ) : (
                <X size={12} strokeWidth={1.8} />
            )}

            {attending ? "Attending" : "Declined"}
        </span>
    );
}

/* LOGIN */

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event) {
        event.preventDefault();

        setLoading(true);
        setError("");

        const { error: loginError } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        if (loginError) {
            setError("Invalid email or password.");
        }

        setLoading(false);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#090909] px-6">

            <div className="w-full max-w-md">

                <div className="text-center text-[#f5f2eb]">

                    <p className="font-serif text-3xl sm:text-4xl">
                        Lionel & Aline
                    </p>

                    <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.35em] text-white/45">
                        Wedding Administration
                    </p>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="mt-14 border border-white/10 bg-white/[0.025] p-8 sm:p-10"
                >

                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
                        Admin Access
                    </p>

                    <h1 className="mt-5 font-serif text-3xl font-light text-[#f5f2eb]">
                        Sign In
                    </h1>

                    {error && (
                        <div className="mt-7 border border-red-400/20 bg-red-400/5 p-4 text-sm leading-6 text-red-300">
                            {error}
                        </div>
                    )}

                    <div className="mt-9">

                        <label className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                            className="mt-4 w-full border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-white/50"
                            placeholder="admin@example.com"
                        />

                    </div>

                    <div className="mt-9">

                        <label className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                            className="mt-4 w-full border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none focus:border-white/50"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-11 w-full bg-[#f5f2eb] py-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

            </div>
        </div>
    );
}