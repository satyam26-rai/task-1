const express = require('express');
const app = express();
const xlsx = require('xlsx');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle calculation
app.post('/calculate', (req, res) => {
  const { num1, num2 } = req.body;

  // Perform calculation
  const result = parseInt(num1) + parseInt(num2);

  // Write result to Excel
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.aoa_to_sheet([['Result'], [result]]);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Calculation');
  xlsx.writeFile(workbook, 'calculation.xlsx');

  // Respond with the result
  res.send({ result });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
//////////////////============================================================================================
 