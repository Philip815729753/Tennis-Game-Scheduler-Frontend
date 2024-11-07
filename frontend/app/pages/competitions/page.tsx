"use client";

import { useEffect, useState } from 'react';
import { Select, Button, Upload, message, Table, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { Team, Season } from '../../utils/interfaces';  //  TypeScript Interfaces
import Cookies from 'js-cookie'; // Import js-cookie
import axios from 'axios';
import { useRouter } from 'next/navigation';
import withAuth from '@/app/utils/withAuth';


const { Option } = Select;

// hard-coded table data to simulate table data
const generateSeasonsData = (): Season[] => {
  const sections = ['OSD-A 1', 'OSD-A 2', 'OSD-A 3', 'OSD-A 4'];
  const teams = ['Beaconsfield', 'Glen Waverley', 'Rowville', 'St. Marys', 'Wheelers Hill', 'Monash Uni', 'Bye', 'Legend Park'];
  const colors = ['Red', 'Green', 'Blue', 'Gold', 'Yellow', 'N/A'];

  const seasons: Season[] = [
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
  // fill-in teams data
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
    });
  }

  return seasons;
};

const Competitions = () => {

    const [username, setUsername] = useState("Guest");
    const [email, setEmail] = useState("xxx@mail.com");

    useEffect(() => {
        if (typeof window !== 'undefined') { // make sure it is in a proper browser window
          const storedUsername = localStorage.getItem("username") || "Guest";
          const storedEmail = localStorage.getItem("email") || "xxx@mail.com";
          setUsername(storedUsername);
          setEmail(storedEmail);
        }

        fetchCompetitions(); // Fetch competitions data every time the component is mounted
      }, []); // Removed the empty dependency array


  const [seasons] = useState(generateSeasonsData()); // simulate competition data
  // const [seasons, setSeasons] = useState<Season[]>([]); // Initialize as empty array
  const [selectedSeason, setSelectedSeason] = useState(""); // default select as the first competition
  const [tableData, setTableData] = useState(seasons[0].teams); // default display of the first competition
  const [uploading, setUploading] = useState(false); // control upload progress

  const [competitionData, setCompetitionData] = useState([])
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // Initialize useRouter hook

  // refresh table data after selecting a particular competition
  const handleCompetitionChange = (value: string) => {
    setSelectedSeason(value);
    const selected = seasons.find((season) => season.id === value);
    setTableData(selected?.teams || []);  // add safety check
  };

  // route to the scheudling page
  const handleGenerateClick = async () => {
    // Find the selected competition in the competitionData array
    const selectedCompetition = competitionData.find((item) => item["compId"] === selectedSeason);

    // Get the JWT token from cookies
    const token = Cookies.get('currentUser');
    if (selectedCompetition) {
      // try {
        
      //     message.info(`Generation process started. This is a simulated message. Selected Competition ID: ${selectedCompetition["compId"]}`);

          // const formdata = new FormData();
          // formdata.append("competitionId", selectedCompetition["compId"]);

      //     // Make a POST request to the backend API
      //     const response = await axios.post('http://localhost:8080/schedule/default_rules', formdata, {
      //       headers: {
      //           'Authorization': `Bearer ${token}`, // Include the JWT token for authentication
      //         },
      //     }
            
      //     );

      //     console.log(response);

      //     // Handle the response
      //     if (response.status === 200) {
      //       message.success(response.data || 'Fixtures scheduled successfully');
      //       router.push("/pages/schedule");
      //     }

      // } catch (error) {
      //   // Handle errors
      //   if (axios.isAxiosError(error) && error.response) {
      //     message.error(`Error scheduling fixtures: ${error.response.data}`);
      //   } else {
      //     message.error('An unknown error occurred while scheduling fixtures');
      //   }
      // }

      
      try {
        setLoading(true); // Start the loading spinner
        message.info(`Generation process started. Selected Competition ID: ${selectedCompetition["compId"]}`);
        const formdata = new FormData();
        formdata.append("competitionId", selectedCompetition["compId"]);
        // send the request to Next.js API router
        const response = await fetch('/api/scheduling', {
          method: 'POST',
          body: formdata,  // sending the file
          headers: {
            'Authorization': `Bearer ${token}`,  // add Bearer Token
          },
        });

        if (response.ok) {
          setLoading(false); // Stop the loading spinner
          const result = await response.json();
          localStorage.setItem("compName", selectedCompetition["compName"]);
          localStorage.setItem("compId", selectedCompetition["compId"]);

          router.push("/pages/schedule");   // jump to scheudle result page
          message.success(result.message);  // pop-up message showing user the success of scheduling
        } else {
          const result = await response.json();
          message.error(result.message || 'Scheudle failed!');
        }
      } catch (error) {
        message.error('Internal Server Error during scheduling!');
      }
    } else {
      message.warning('Please select a competition before scheduling.');
    }
  };

  // restrict the upload file type to be either CSV or Excel
  const beforeUpload = (file: File) => {
    const isCsvOrExcel = file.type === 'application/vnd.ms-excel' || 
                         file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                         file.type === 'text/csv';
    if (!isCsvOrExcel) {
      message.error('You can only upload CSV or Excel file!');
    }
    return isCsvOrExcel; // restrict the upload file type
  };

  // uplaoding progress bar
  // const handleUpload = (info: any) => {
  //   if (info.file.status === 'uploading') {
  //       setUploading(true);                  // show progress bar
  //     } else if (info.file.status === 'done') {
  //       setUploading(false);                 // hide progress bar
  //       message.success(`${info.file.name} uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       setUploading(false);                 // hide progress bar
  //       message.error(`${info.file.name} upload failed.`);
  //     }
  // };

  const handleUpload = async ({ file }: any) => {
    const formData = new FormData();
    formData.append('file', file);  // file for upload
    console.log(file.name);

    const token = Cookies.get('currentUser');  // acquire the JWT Token from Cookie

    try {
      setUploading(true);  // start the upload progress bar

      // send the request to Next.js API router
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,  // sending the file
        headers: {
          'Authorization': `Bearer ${token}`,  // add Bearer Token
        },
      });

      if (response.ok) {
        const result = await response.json();
        fetchCompetitions(); // Call the fetchCompetitions function to refresh data after successful upload
        message.success(result.message);  // pop-up message showing user the success of upload
      } else {
        const result = await response.json();
        message.error(result.message || 'Upload failed');
      }
    } catch (error) {
      message.error('Internal Server Error during file upload');
    } finally {
      setUploading(false);  // upload completed
    }
  };

  // // Fetch competition list from the backend
  // const fetchCompetitions = async () => {
  //   try {
  //     const token = Cookies.get('currentUser'); // Get the JWT token from cookies
  //     const response = await axios.get('http://localhost:8080/competitions/all', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
  //       },
  //     });
  //     console.log(response.data);
  //     setCompetitionData(response.data);
  //   } catch (error) {
  //     message.error('Failed to fetch competitions');
  //   }
  // };

  // Front-end function to call the API route and fetch competition data
  const fetchCompetitions = async () => {
    try {
      // Get the JWT token from cookies or local storage
      const token = Cookies.get('currentUser');

      // Make a request to the Next.js API route
      const response = await fetch('/api/getcompetitions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token as a Bearer token
        },
      });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        // console.log('Competition data:', data);
        setCompetitionData(data); // Use the data as needed in your component
      } else {
        // Handle the error response
        const errorData = await response.json();
        message.error(errorData.message || 'Failed to fetch competitions');
      }
    } catch (error) {
      message.error('An error occurred while fetching competitions');
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
  ];

  return (
    <div className="h-screen flex">
      {/* include Sidebar */}
      <Sidebar />

      {/* main section */}
      <div className="flex-1 flex flex-col">
        <Header username={username} email={email} pageName="Competitions Management" />


        <main className="flex-1 flex flex-col items-center justify-center bg-gray-100 min-h-screen">
          {/* Loading spinner */}
          {/* <Spin spinning={loading} tip="Scheduling..."></Spin> */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <Spin size="large" tip="Scheduling..." />
            </div>
          )}
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl mt-12">
            <h2 className="text-2xl font-bold text-center text-[#3b4f84] mb-6">Competitions Management</h2>

            {/* competition selection */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <label className="text-lg font-bold mr-4 text-black">Select Competition</label>
                <Select
                  value={selectedSeason}
                  onChange={handleCompetitionChange}
                  className="w-64"
                >
                  {/* {seasons.map((season) => (
                    <Option key={season.id} value={season.id}>
                      {season.name}
                    </Option>
                  ))} */}
                  {competitionData.map((item) => (
                    <Option key={item['compId']} value={item['compId']}>
                      {item['compName'] + " " + item['compId']}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* upload button, restrict upload file type */}
              <Upload 
                beforeUpload={beforeUpload} 
                customRequest={handleUpload}
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                listType="text" 
                maxCount={1} // only 1 file for upload
                showUploadList={uploading}  // hide the uploading progress after uploading
              >
                <Button icon={<UploadOutlined />}>Upload CSV/Excel</Button>
              </Upload>
            </div>

            {/* table form Container */}
            <div style={{ height: '500px', overflow: 'auto' }}>
              <Table 
                columns={columns} 
                dataSource={tableData} 
                pagination={false} 
                sticky // fix the table title row
              />
            </div>

            {/* scheudling buttong*/}
            <div className="flex justify-end mt-4">
              <Button className="w-48" type="primary" onClick={handleGenerateClick}>
                Schedule
              </Button>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default withAuth(Competitions);




