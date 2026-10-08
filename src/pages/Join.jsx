// src/pages/Join.jsx
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { site } from "../siteConfig";
import "../styles/common.css";
import "../styles/join.css";

export default function Join() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [saving, setSaving] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await addDoc(collection(db, "leads"), { ...form, createdAt: serverTimestamp() });
            setSubmitted(true);
            setForm({ name: "", email: "", message: "" });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container">
            <h2>Join Us</h2>
            <p>Join our mailing list or community group. We’ll keep you posted on upcoming events.</p>
            {submitted && <p style={{ color: 'limegreen' }}>Thanks! We’ll be in touch.</p>}
            <form className="form" onSubmit={onSubmit}>
                <label>
                    Name
                    <input className="input" name="name" value={form.name} onChange={onChange} required />
                </label>
                <label>
                    Email
                    <input className="input" type="email" name="email" value={form.email} onChange={onChange} required />
                </label>
                <label>
                    Message (optional)
                    <textarea className="textarea" name="message" value={form.message} onChange={onChange} rows={3} />
                </label>
                <button className="btn" type="submit" disabled={saving}>{saving ? 'Submitting…' : 'Join'}</button>
            </form>

            <h3>Connect with us</h3>
            <p>
                <a className={`btn link`} href={site.socials.discord} target="_blank" rel="noreferrer">Discord</a>
                <a className={`btn link`} href={site.socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
                <a className={`btn link`} href={site.socials.twitter} target="_blank" rel="noreferrer">Twitter/X</a>
                <a className={`btn link`} href={site.socials.email} target="_blank" rel="noreferrer">Email</a>
            </p>
        </div>
    );
}
