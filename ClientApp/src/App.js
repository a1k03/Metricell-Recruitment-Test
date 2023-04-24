import React, { useState, useEffect } from 'react';

export default function () {
    const [employees, setEmployees] = useState([]);

    async function getEmployees() {
        return fetch("/employees").then(response => response.json());
    }

    async function createEmployee(name, value) {
        return fetch("/employees", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    async function updateEmployee(name, value) {
        return fetch("/employees", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    useEffect(() => {
        async function fetchEmployees() {
            const data = await getEmployees();
            setEmployees(data);
        }
        fetchEmployees();
    }, []);

    const handleAddEmployee = async () => {
        const name = window.prompt('Enter employee name:');
        const value = parseInt(window.prompt('Enter employee value:'));
        await createEmployee(name, value);
        setEmployees([...employees, { name, value }]);
    }

    const handleEditEmployee = async (index) => {
        const { name, value } = employees[index];
        const newName = window.prompt('Enter new name:', name);
        const newValue = parseInt(window.prompt('Enter new value:', value));
        await updateEmployee(newName, newValue);
        const updatedEmployees = [...employees];
        updatedEmployees[index].name = newName;
        updatedEmployees[index].value = newValue;
        setEmployees(updatedEmployees);
    }

    return (
        <div>
            <button onClick={handleAddEmployee}>Add Employee</button>
            <ul>
                {employees.map((employee, index) =>
                    <li key={index}>
                        {employee.name} - {employee.value}
                        <button onClick={() => handleEditEmployee(index)}>Edit</button>
                    </li>
                )}
            </ul>
        </div>
    );
}
