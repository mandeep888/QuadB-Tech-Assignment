// Info object to store loading status, data, and any potential errors
const info = {
    loading: true,
    data: [],
    error: "",
  };
  
  // Fetch Data from the server
  const fetchData = () => {
    // Fetch data from the correct API endpoint, which is set up in the backend
    fetch("/tickers") // The correct API link based on your project
      .then((res) => res.json())
      .then((data) => {
        info.data = data; // Store the fetched data
        info.loading = false;
        info.error = "";
      })
      .catch((error) => {
        info.error = "Error fetching data";
        console.error(error);
      });
  };
  
  // Function to populate data into the table
  const setData = () => {
    // Clear the existing table before appending new data
    insertData.innerHTML = "";
  
    // Iterate over the fetched data and add each row to the table
    for (let i = 0; i < info.data.length; i++) {
      const tr = document.createElement("tr");
  
      // Populate each table row with data
      tr.innerHTML = `
        <td><h4>${i + 1}</h4></td>
        <td><h4>${info.data[i].name}</h4></td>
        <td><h4>₹ ${info.data[i].last}</h4></td>
        <td><h4><span style="display: inline-block">₹ ${info.data[i].buy}</span> / <span style="display: inline-block">₹ ${info.data[i].sell}</span></h4></td>
        <td><h4>${info.data[i].volume}</h4></td>
        <td><h4>${info.data[i].base_unit}</h4></td>
      `;
  
      insertData.appendChild(tr); // Add the row to the table
    }
  };
  
  // Get reference to the table body where data will be inserted
  const insertData = document.getElementById("insertData");
  
  // Fetch the initial data
  fetchData();
  
  // Populate the table data after fetching it (2-second delay to simulate loading)
  setTimeout(() => setData(), 2000);
  
  // Theme toggling functionality
  const root = document.getElementById("root");
  
  function themeChange() {
    // Toggle between light and dark themes
    root.classList.toggle("theme-dark");
    root.classList.toggle("theme-light");
  }
  
  // Countdown for data refresh
  let i = 0;
  const count = document.getElementById('count');
  
  // Refresh data every 60 seconds
  setInterval(() => {
    count.innerHTML = `${i}`; // Update the countdown display
  
    if (i === 58) {
      fetchData(); // Fetch new data from the backend when countdown reaches 58
    }
  
    if (i === 60) {
      insertData.innerHTML = ""; // Clear existing data from the table
      setData(); // Repopulate the table with new data
      i = 0; // Reset the countdown
    }
  
    i++;
  }, 1000); // 1-second interval
  