import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

import api from "../lib/axios";
import toast from "react-hot-toast";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");

                setNotes(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error(error);

                if (error.response?.status === 401) {
                    localStorage.removeItem("token");

                    toast.error("Please login again");

                    navigate("/login");
                    return;
                }

                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [navigate]);

    return (
        <div className="min-h-screen">
            <Navbar />

            {isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && (
                    <div className="flex justify-center py-16">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )}

                {!loading &&
                    notes.length === 0 &&
                    !isRateLimited && <NotesNotFound />}

                {!loading &&
                    notes.length > 0 &&
                    !isRateLimited && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {notes.map((note) => (
                                <NoteCard
                                    key={note._id}
                                    note={note}
                                    setNotes={setNotes}
                                />
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default HomePage;