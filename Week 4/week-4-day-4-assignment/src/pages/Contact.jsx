import { useState } from "react"

const SUBJECTS = ["General Inquiry", "Bug Report", "Feature Request", "Partnership"]
const MIN_MESSAGE = 20
const emptyForm = { name: "", email: "", subject: "", message: "" }

function validate(values) {
    const next = {}
    if (!values.name.trim()) next.name = "Please enter your name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email address."
    if (!SUBJECTS.includes(values.subject)) next.subject = "Please choose a subject."
    if (values.message.trim().length < MIN_MESSAGE)
        next.message = `Your message must be at least ${MIN_MESSAGE} characters.`
    return next
}

const baseInput =
    "border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-900 text-slate-100 placeholder-slate-500"

function Contact() {
    const [form, setForm] = useState(emptyForm)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false) // has the user tried to submit yet?
    const [success, setSuccess] = useState(false)

    // Neutral before the first submit; afterwards red if invalid, green if valid.
    function inputClass(field) {
        if (!submitted) return `${baseInput} border-slate-600`
        return `${baseInput} ${errors[field] ? "border-red-500" : "border-green-500"}`
    }

    function handleChange(event) {
        const { name, value } = event.target
        const next = { ...form, [name]: value }
        setForm(next)
        setSuccess(false)
        // After the first submit attempt, re-validate as the user types (real-time feedback)
        if (submitted) setErrors(validate(next))
    }

    function handleSubmit(event) {
        event.preventDefault()
        const found = validate(form)
        setErrors(found)
        setSubmitted(true)

        if (Object.keys(found).length === 0) {
            console.log("Contact form submitted:", form)
            setSuccess(true)
            setForm(emptyForm)
            setErrors({})
            setSubmitted(false) // back to neutral borders for the fresh form
        }
    }

    // Plain helper (not a component) so it isn't re-created as a new component each render
    function errorText(field) {
        if (!errors[field]) return null
        return (
            <p id={`${field}-error`} className="mb-0 mt-1 text-sm text-red-500">
                {errors[field]}
            </p>
        )
    }

    return (
        <section className="mx-auto max-w-5xl">
            <div className="mx-auto w-full md:w-1/2">
                <p className="eyebrow">// CONTACT</p>
                <h1 className="mb-6 text-3xl font-bold">Send a message</h1>

                {success && (
                    <p className="mb-6 rounded-lg border border-green-500 bg-green-500/10 p-4 text-green-400" role="status">
                        Thanks for your message! We'll get back to you soon.
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5 rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl sm:p-8"
                >
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-semibold">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            autoComplete="name"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className={inputClass("name")}
                        />
                        {errorText("name")}
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-semibold">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className={inputClass("email")}
                        />
                        {errorText("email")}
                    </div>

                    <div>
                        <label htmlFor="subject" className="mb-1 block text-sm font-semibold">Subject</label>
                        <select
                            id="subject"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            aria-invalid={!!errors.subject}
                            aria-describedby={errors.subject ? "subject-error" : undefined}
                            className={inputClass("subject")}
                        >
                            <option value="" disabled>Choose a subject…</option>
                            {SUBJECTS.map((subject) => (
                                <option key={subject} value={subject}>{subject}</option>
                            ))}
                        </select>
                        {errorText("subject")}
                    </div>

                    <div>
                        <label htmlFor="message" className="mb-1 block text-sm font-semibold">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="What would you like to build, ask, or discuss?"
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? "message-error" : undefined}
                            className={inputClass("message")}
                        />
                        <div className="flex justify-between gap-4">
                            {errorText("message")}
                            <span className="ml-auto mt-1 text-xs text-slate-400">
                                {form.message.trim().length}/{MIN_MESSAGE} min
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer border-0 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 sm:w-auto"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact