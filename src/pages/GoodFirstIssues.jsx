import React, { useEffect, useState, useCallback } from 'react';
import { Octokit } from '@octokit/rest'; // Import Octokit
import Sidebar from "../Components/Sidebar";

const octokit = new Octokit(); // Create an instance of Octokit

const GoodFirstIssues = () => {
    const [issues, setIssues] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchIssues = useCallback(async (pageNumber) => {
        setLoading(true);
        try {
            const response = await octokit.rest.search.issuesAndPullRequests({
                q: 'label:"good first issue" is:open',
                per_page: 15,
                page: pageNumber,
            });
            setIssues(response.data.items);
            setTotalPages(Math.ceil(response.data.total_count / 15)); // Calculate total pages
        } catch (error) {
            setError("Error fetching issues: " + error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIssues(page);
    }, [fetchIssues, page]);

    return (
        <div className="flex flex-row bg-[#1B2430] min-h-screen">
            <Sidebar />
            <div className="md:w-4/6 w-full md:ml-20 mx-2 p-6">
                <h1 className="text-2xl font-bold text-white">Good First Issues</h1>
                {loading && <p className="text-white">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="container mx-auto p-6 pt-10 pb-10">
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th className="text-left p-4">Title</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.map((issue) => (
                                <tr key={issue.id} className="border-b border-gray-200">
                                    <td className="p-4">{issue.title}</td>
                                    <td className="p-4">{issue.body ? issue.body.substring(0, 100) + '...' : 'No description available.'}</td>
                                    <td className="p-4">
                                        <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                                            View Issue
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center mt-6 px-4 space-x-4">
                    <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50">
                        Previous
                    </button>
                    <span className="text-lg">Page {page} of {totalPages}</span>
                    <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
export default GoodFirstIssues; 