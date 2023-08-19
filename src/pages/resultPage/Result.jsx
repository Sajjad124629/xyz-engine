import Layout from "../../layout/Layout";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const Result = () => {
  // Fetch the data from localStorage
  const localStorageData = JSON.parse(localStorage.getItem('formData'))||[];
  const handleDownloadPDF = () => {
    // Create a new jsPDF instance with a custom page size
    const pdf = new jsPDF({
      orientation: 'landscape', // or 'portrait'
      unit: 'mm',
      format: [210, 297], // A4 size, adjust as needed
    });

    // Add centered title
    const title = 'Total Result Of Gas And Oil Industry';
    const titleFontSize = 18;
    const titleX = pdf.internal.pageSize.width / 2;
    const titleY = 15;
    pdf.setFontSize(titleFontSize);
    pdf.text(title, titleX, titleY, { align: 'center' });


    // ... (retrieving saved data from localStorage)

    const tableData = localStorageData.map((data, index) => [
      index + 1,
      data.projectName,
      data.projectDescription,
      data.client,
      data.contractor,
      data.max_X,
      data.min_X,
      data.max_Y,
      data.min_Y,
      data.max_Z,
      data.min_Z,
    ]);

    const tableHeaders = [
      '',
      'Project Name',
      'Project Description',
      'Client',
      'Contractor',
      'Max X',
      'Min X',
      'Max Y',
      'Min Y',
      'Max Z',
      'Min Z',
    ];

    pdf.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 20, // Adjust the starting Y-coordinate
    });

    // Save PDF
    pdf.save('result.pdf');
  };
  return (
    <>
      <Layout>
        <h4 className="text-xl text-center mt-28 mb-5">
          Total Result Of Gas And Oil Industry
        </h4>
        <div className="container w-[1280px]">
          <div className="flex justify-end">
            <button onClick={handleDownloadPDF} className="btn btn-outline btn-accent btn-sm">Download PDF</button>
          </div>
          <div className="overflow-x-auto text-white">
            <table className="table table-zebra ">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Project Name</th>
                  <th>Project Description</th>
                  <th>Client</th>
                  <th>Contractor</th>
                  <th>Max X</th>
                  <th>Min X</th>
                  <th>Max Y</th>
                  <th>Min Y</th>
                  <th>Max Z</th>
                  <th>Min Z</th>
                </tr>
              </thead>
              <tbody>
                {
                  localStorageData.map((data, key) => (

                    <tr key={JSON.stringify(key)}>
                      <th>{key + 1}</th>
                      <td>{data.projectName}</td>
                      <td>{data.projectDescription}</td>
                      <td>{data.client}</td>
                      <td>{data.contractor}</td>
                      <td>{data.max_X}</td>
                      <td>{data.min_X}</td>
                      <td>{data.max_Y}</td>
                      <td>{data.min_Y}</td>
                      <td>{data.max_Z}</td>
                      <td>{data.min_Z}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Result;