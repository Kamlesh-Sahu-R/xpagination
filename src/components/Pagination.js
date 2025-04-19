import { useEffect, useState } from "react";
import "./Pagination.css";

export default function Pagination(){
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentpage] = useState(1);
    const employeesPerPage = 10;

    const employeesData_url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    useEffect( () => {
        fetch(employeesData_url)
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(error => console.log(`Failed to fetch with error: ${error}`));
    }, []);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPage = Math.ceil(employees.length / employeesPerPage);

    const handlePageChange = (pageNumber) => {
        if(pageNumber < 1 || pageNumber > totalPage) {
            return;
        }
        setCurrentpage(pageNumber);
    };

    return (
        <div className="container">
            <h1>Employe Data Table</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map( emp => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination"> 
                <button onClick = { () => handlePageChange(currentPage - 1)}>Previous</button>
                <div className="pageIndicator">{currentPage}</div>
                <button onClick = { () => handlePageChange(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
}