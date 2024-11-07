"use client";

import { useEffect, useState } from 'react';
import { Select, Button, Upload, message, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { SchedulingTeam, SchedulingSeason } from '../../utils/interfaces';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { saveAs } from 'file-saver'; // Import file-saver to handle file downloads
import Cookies from 'js-cookie'; // Import js-cookie
import withAuth from '@/app/utils/withAuth';

const { Option } = Select;

// hard-coded data for the table column simulation
const generateSeasonsData = (): SchedulingSeason[] => {
    const sections = ['OSD-A 1', 'OSD-A 2', 'OSD-A 3', 'OSD-A 4'];
    const teams = ['Beaconsfield', 'Glen Waverley', 'Rowville', 'St. Marys', 'Wheelers Hill', 'Monash Uni', 'Bye', 'Legend Park'];
    const colors = ['Red', 'Green', 'Blue', 'Gold', 'Yellow', 'N/A'];

    const seasons: SchedulingSeason[] = [
        {
            id: '1',
            name: 'Season 1',
            teams: [],
        },
        {
            id: '2',
            name: 'Season 2',
            teams: [],
        },
    ];

    // fill-in simulation teams data
    for (let i = 1; i <= 25; i++) {
        seasons[0].teams.push({
            key: i,
            competition: 'Open Singles/Doubles',
            section_code: i % 4 + 1,
            section_name: sections[i % 4],
            draw_code: 8,
            team_code: i,
            team_name: teams[i % teams.length],
            team_color: colors[i % colors.length],
            fixture_number: i, 
            conflict: i % 20 == 0,  
        });
    }

    for (let i = 26; i <= 50; i++) {
        seasons[1].teams.push({
            key: i,
            competition: 'Open Singles/Doubles',
            section_code: i % 4 + 1,
            section_name: sections[i % 4],
            draw_code: 8,
            team_code: i,
            team_name: teams[i % teams.length],
            team_color: colors[i % colors.length],
            fixture_number: i,  
            conflict: i % 20 == 0, 
        });
    }

    return seasons;
};

const Schedule = () => {

    const [username, setUsername] = useState("Guest");
    const [email, setEmail] = useState("xxx@mail.com");

    useEffect(() => {
        if (typeof window !== 'undefined') { // make sure this page runs in a browser environment
            const storedUsername = localStorage.getItem("username") || "Guest";
            const storedEmail = localStorage.getItem("email") || "xxx@mail.com";
            setUsername(storedUsername);
            setEmail(storedEmail);
        }
    }, []); 

    const [seasons] = useState(generateSeasonsData()); // simulated competition data 


    // Function to export the table data to a CSV file
    const handleExport = async () => {

        const token = Cookies.get('currentUser');

        try {
            // Make an Axios GET request to the backend API to get the Excel file
            const response = await axios.get('http://localhost:8080/file/export', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
                },
                params: { competitionId: localStorage.getItem("compId") }, // Send competitionId as a parameter
                responseType: 'blob', // Important for handling binary data
            });
    
            // Create a blob from the response data
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
    
            // Use file-saver to trigger the download
            saveAs(blob, `${localStorage.getItem("compName") + " " + localStorage.getItem("compId") + " fixtures"}.xlsx`);
            message.success("File exported successfully.");
        } catch (error) {
            message.error("Failed to export file.");
        }
    };

        // Function to export the table data to a CSV file
        const handleExportDetails = async () => {

            const token = Cookies.get('currentUser');
    
            try {
                // Make an Axios GET request to the backend API to get the Excel file
                const response = await axios.get('http://localhost:8080/file/exportDetail', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
                    },
                    params: { competitionId: localStorage.getItem("compId") }, // Send competitionId as a parameter
                    responseType: 'blob', // Important for handling binary data
                });
        
                // Create a blob from the response data
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
        
                // Use file-saver to trigger the download
                saveAs(blob, `${localStorage.getItem("compName") + " " + localStorage.getItem("compId") + " fixture details"}.xlsx`);
                message.success("File exported successfully.");
            } catch (error) {
                message.error("Failed to export file.");
            }
        };

    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (_: any, __: any, index: number) => index + 1,
            width: 70,
        },
        {
            title: 'Competition',
            dataIndex: 'competition',
            key: 'competition',
            width: 150,
        },
        {
            title: 'Section Code',
            dataIndex: 'section_code',
            key: 'section_code',
            width: 120,
        },
        {
            title: 'Section Name',
            dataIndex: 'section_name',
            key: 'section_name',
            width: 150,
        },
        {
            title: 'Draw Code',
            dataIndex: 'draw_code',
            key: 'draw_code',
            width: 100,
        },
        {
            title: 'Team Code',
            dataIndex: 'team_code',
            key: 'team_code',
            width: 100,
        },
        {
            title: 'Team Name',
            dataIndex: 'team_name',
            key: 'team_name',
            width: 150,
        },
        {
            title: 'Team Color',
            dataIndex: 'team_color',
            key: 'team_color',
            width: 120,
        },
        {
            title: 'Fixure Number',  // new 'Fixure Number' column
            dataIndex: 'fixture_number',
            key: 'fixture_number',
            width: 120,
        },
        {
            title: 'Conflict',  // new 'Conflict' column
            dataIndex: 'conflict',
            key: 'conflict',
            width: 120,
            render: (conflict: boolean) => (conflict ? 'Yes' : 'No'), 
        }
    ];

    return (
        <div className="h-screen flex">
            {/* include Sidebar */}
            <Sidebar />

            {/* Main Section */}
            <div className="flex-1 flex flex-col">
                <Header username={username} email={email} pageName="Scheduling" />


                <main className="flex-1 flex flex-col items-center justify-center bg-gray-100 min-h-screen">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl mt-12">
                        <h2 className="text-2xl font-bold text-center text-[#3b4f84] mb-6">Schedule Results</h2>

                        {/* showing the scheduled competition */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <label className="text-lg font-bold mr-4 text-black">Competition: </label>
                                <span className="text-lg text-black">{localStorage.getItem("compName") + " " + localStorage.getItem("compId")}</span>
                            </div>

                            {/* Export Button */}
                            {/* <div className="flex justify-end mt-4">
                                <Button className="w-48" type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
                                    Export
                                </Button>
                            </div>

                            <div className="flex justify-end mt-4">
                                <Button className="w-48" type="primary" icon={<DownloadOutlined />} onClick={handleExportDetails}>
                                    Export Details
                                </Button>
                            </div> */}
                            {/* Export Buttons Container */}
                            <div className="flex justify-end mt-4 space-x-4">
                                <Button className="w-48" type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
                                    Export
                                </Button>

                                <Button className="w-48" type="primary" icon={<DownloadOutlined />} onClick={handleExportDetails}>
                                    Export Details
                                </Button>
                            </div>
                        </div>

                        {/* Table Container */}
                        <div style={{ height: '500px', overflow: 'auto' }}>
                            <Table
                                columns={columns}
                                // dataSource={tableData}
                                pagination={false}
                                sticky // fix those table columns
                                rowClassName={(record) => (record.conflict ? 'conflict-row' : '')} // apply the style based on 'Conflict'
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default withAuth(Schedule);

