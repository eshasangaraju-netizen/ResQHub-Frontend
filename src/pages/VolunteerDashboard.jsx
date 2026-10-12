import { useEffect, useState } from "react";
import API from "../services/api";

function VolunteerDashboard() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const [emergencies, setEmergencies] =
        useState([]);

    const loadEmergencies = async () => {

        const response =
            await API.get("/emergencies");

        setEmergencies(response.data);
    };

    useEffect(() => {
        loadEmergencies();
    }, []);

    const acceptEmergency = async (emergency) => {

        await API.put(
            `/emergencies/${emergency.id}`,
            {
                ...emergency,
                volunteerId: user.id,
                status: "IN_PROGRESS"
            }
        );

        loadEmergencies();
    };

    const completeEmergency = async (emergency) => {

        await API.put(
            `/emergencies/${emergency.id}`,
            {
                ...emergency,
                status: "RESOLVED"
            }
        );

        loadEmergencies();
    };

    return (

        <div className="dashboard">

            <h1>Volunteer Dashboard</h1>

            <h2>Emergency Requests</h2>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Severity</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {emergencies.map(e => (

                        <tr key={e.id}>

                            <td>{e.id}</td>

                            <td>{e.type}</td>

                            <td>{e.location}</td>

                            <td>{e.severity}</td>

                            <td>{e.status}</td>

                            <td>

                                {e.status === "REPORTED" && (

                                    <button
                                        onClick={() =>
                                            acceptEmergency(e)
                                        }
                                    >
                                        Accept
                                    </button>

                                )}

                                {e.volunteerId === user.id &&
                                    e.status === "IN_PROGRESS" && (

                                    <button
                                        onClick={() =>
                                            completeEmergency(e)
                                        }
                                    >
                                        Complete
                                    </button>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default VolunteerDashboard;
