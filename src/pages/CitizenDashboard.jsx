import { useEffect, useState } from "react";
import API from "../services/api";

function CitizenDashboard() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const [emergencies, setEmergencies] = useState([]);

    const [form, setForm] = useState({
        type: "",
        location: "",
        severity: "LOW",
        peopleAffected: 1
    });

    const loadEmergencies = async () => {

        const response =
            await API.get("/emergencies");

        setEmergencies(response.data);
    };

    useEffect(() => {
        loadEmergencies();
    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    
const submitEmergency = async (e) => {
    e.preventDefault();

    console.log("REPORT BUTTON CLICKED");
    console.log("Form data:", form);
    console.log("User:", user);

    try {
        console.log("Sending POST request...");

        const response = await API.post("/emergencies", {
            ...form,
            peopleAffected: Number(form.peopleAffected),
            userId: user.id,
            status: "REPORTED",
            volunteerId: null
        });

        console.log("POST successful:", response.status, response.data);

        alert("Emergency reported!");

        setForm({
            type: "",
            location: "",
            severity: "LOW",
            peopleAffected: 1
        });

        await loadEmergencies();

    } catch (error) {
        console.error(
            "Emergency submission failed:",
            error.response?.status,
            error.response?.data || error.message
        );

        alert("Submission failed. Check the browser Console.");
    }
};



    return (
        <div className="dashboard">

            <h1>Citizen Dashboard</h1>

            <h2>Report Emergency</h2>

            <form onSubmit={submitEmergency}>

                <input
                    name="type"
                    placeholder="Emergency Type"
                    value={form.type}
                    onChange={handleChange}
                    required
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    required
                />

                <select
                    name="severity"
                    value={form.severity}
                    onChange={handleChange}
                >
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                </select>

                <input
                    name="peopleAffected"
                    type="number"
                    min="1"
                    value={form.peopleAffected}
                    onChange={handleChange}
                />

                <button type="submit">
                    Report Emergency
                </button>

            </form>

            <h2>My Emergency Requests</h2>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Severity</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {emergencies
                        .filter(e => e.userId === user.id)
                        .map(e => (

                            <tr key={e.id}>

                                <td>{e.id}</td>

                                <td>{e.type}</td>

                                <td>{e.location}</td>

                                <td>{e.severity}</td>

                                <td>{e.status}</td>

                            </tr>

                        ))}

                </tbody>

            </table>

        </div>
    );
}

export default CitizenDashboard;
