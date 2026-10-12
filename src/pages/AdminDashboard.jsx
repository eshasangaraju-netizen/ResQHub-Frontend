import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

    const [emergencies, setEmergencies] =
        useState([]);

    const [resources, setResources] =
        useState([]);

    const loadData = async () => {

        const emergencyResponse =
            await API.get("/emergencies");

        const resourceResponse =
            await API.get("/resources");

        setEmergencies(emergencyResponse.data);

        setResources(resourceResponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const updateStatus = async (emergency) => {

        await API.put(
            `/emergencies/${emergency.id}`,
            {
                ...emergency,
                status: "IN_PROGRESS"
            }
        );

        loadData();
    };

    const deleteEmergency = async (id) => {

        if (
            window.confirm(
                "Delete this emergency?"
            )
        ) {

            await API.delete(
                `/emergencies/${id}`
            );

            loadData();
        }
    };

    return (

        <div className="dashboard">

            <h1>Admin Dashboard</h1>

            <div className="cards">

                <div>
                    <h3>Total Requests</h3>
                    <p>{emergencies.length}</p>
                </div>

                <div>
                    <h3>Resources</h3>
                    <p>{resources.length}</p>
                </div>

            </div>

            <h2>Emergency Requests</h2>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Severity</th>
                        <th>Status</th>
                        <th>Actions</th>
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

                                <button
                                    onClick={() =>
                                        updateStatus(e)
                                    }
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() =>
                                        deleteEmergency(e.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <h2>Resources</h2>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                    </tr>

                </thead>

                <tbody>

                    {resources.map(resource => (

                        <tr key={resource.id}>

                            <td>{resource.id}</td>

                            <td>{resource.name}</td>

                            <td>{resource.quantity}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default AdminDashboard;
