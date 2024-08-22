import './App.css';
import { useState } from 'react';
import { HashLoader } from 'react-spinners';
import axios from 'axios';
import 'animate.css';

function App() {
  const [table, setTable] = useState('');
  const [domain, setDomain] = useState('');
  const [domainData, setDomainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDomainInfo = (event) => {
    setLoading(true);
    event.preventDefault();
    axios.get('https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_6QfpPl1Vdyu70njj8hNbeY8AnEwmM&domainName=' + domain + '&outputFormat=JSON')
    .then(response => {
        if (response.data.ErrorMessage) {
          alert('Error: ' + response.data.ErrorMessage.msg);
          setTable('');
        } else {
          setDomainData(response.data.WhoisRecord);
          if (table === '') {
            setTable('domain-info');
          }
        }
        setLoading(false);
        
    })
    .catch(error => {
        alert('Error: ' + error);
        setLoading(false);
    });
  }
  const handleChange = (event) => {
    const value = event.target.value;
    setDomain(value);
  };
  return (
    <div className="App">
      <div className='h-screen w-screen bg-transparent !absolute loading-spinner'
        style={{visibility: (loading ? 'visible' : 'hidden'), opacity: (loading ? '1' : '0')}}>
        <HashLoader color="#1E293B" className='!absolute top-[calc(50%-25px)] left-[calc(50%-25px)]' />
      </div>
      <header className="App-header px-4">
      <h1 className='animate__animated animate__fadeInDown'>TLV300- Home Assignment for <br></br>Full Stack Developer</h1>
      <div className='w-full backdrop-blur'>
        <form action='' method='GET' className='mb-10 flex flex-col gap-4 md:flex-row justify-center'>
          <label className='animate__animated animate__fadeInLeft animate__delay-2s'>Website Domain:</label>
          <input id='input-domain' onChange={handleChange} placeholder='www.domain.com' type="text" className='bg-transparent border-t-0 border-r-0 border-l-0 border-white outline-0 text-slate text-base text-center text-white placeholder-white px-2 py-1 mx-5 animate__animated animate__zoomIn animate__delay-2s' />
          <button onClick={getDomainInfo} className='bg-white border-0 px-4 py-2 rounded-xl text-slate-800 cursor-pointer hover:scale-110 transform transition duration-200 animate__animated animate__fadeInRight animate__delay-2s'>Submit</button>
        </form>
        <select
          id='select-table'
          className='bg-white border-0 px-4 py-2 rounded-xl text-slate-800 mb-10 cursor-pointer'
          onChange={(e) => setTable(e.target.value)}
          style={{opacity: (table === '' ? '0' : '1') }}>
          <option value="domain-info">Domain Information</option>
          <option value="contact-info">Contact Information</option>
        </select>
        <div className='w-full overflow-x-auto duration-500 overflow-hidden'
            style={{maxHeight: (table === 'domain-info' ? '500px' : '0') }}>
          <table 
            id='table-domain-info' 
            className='border-separate border border-solid border-slate-500 rounded-xl m-auto'
          >
            <thead>
              <tr>
                <th className='border border-solid border-slate-600 bg-slate-700 px-4 py-2 text-sm rounded-tl-xl'>Domain Name</th>
                <th className='border border-solid border-slate-600 bg-slate-700 px-4 py-2 text-sm'>Registrar</th>
                <th className='border border-solid border-slate-600 bg-slate-700 px-4 py-2 text-sm'>Registration Date</th>
                <th className='border border-solid border-slate-600 bg-slate-700 px-4 py-2 text-sm'>Expiration Date</th>
                <th className='border border-solid border-slate-600 bg-slate-700 px-4 py-2 text-sm'>Estimated Domain Age</th>
                <th className='border border-solid border-slate-600 bg-slate-700 px-4 py-2 text-sm rounded-tr-xl'>Hostnames</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-solid border-slate-700 bg-slate-800 px-4 py-2 text-sm rounded-bl-xl'>{domainData.domainName}</td>
                <td className='border border-solid border-slate-700 bg-slate-800 px-4 py-2 text-sm'>{domainData.registrarName}</td>
                <td className='border border-solid border-slate-700 bg-slate-800 px-4 py-2 text-sm'>{domainData.createdDate}</td>
                <td className='border border-solid border-slate-700 bg-slate-800 px-4 py-2 text-sm'>{domainData.expiresDate}</td>
                <td className='border border-solid border-slate-700 bg-slate-800 px-4 py-2 text-sm'>{domainData.estimatedDomainAge}</td>
                <td className='border border-solid border-slate-700 bg-slate-800 px-4 py-2 text-sm rounded-br-xl'>
                  {
                    domainData.nameServers ? domainData.nameServers.hostNames.map((data, index) => {
                      return (
                          <span key={index}>{data.length > 25 ? data.substring(0, 22) + "..." : data }<br></br></span>
                      )
                    }) : ''
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='w-full overflow-x-auto duration-500 overflow-hidden'
            style={{maxHeight: (table === 'contact-info' ? '500px' : '0') }}>
          <table id='table-contact-info' 
            className='border-separate border border-solid border-slate-500 rounded-xl m-auto'
          >
            <thead>
              <tr>
                <th className='border border-solid border-slate-600 bg-slate-700 px-4 py-2 text-sm rounded-tl-xl'>Registrant Name</th>
                <th className='border border-solid border-slate-600 bg-slate-700 px-4 py-2 text-sm'>Technical Contact Name</th>
                <th className='border border-solid border-slate-600 bg-slate-700 px-4 py-2 text-sm'>Administrative Contact Name</th>
                <th className='border border-solid border-slate-600 bg-slate-700 px-4 py-2 text-sm rounded-tr-xl'>Contact Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-solid border-slate-700 bg-slate-800 px-4 py-2 text-sm rounded-bl-xl'>{domainData.registrant ? domainData.registrant.name : ''}</td>
                <td className='border border-solid border-slate-700 bg-slate-800 px-4 py-2 text-sm'>{domainData.technicalContact ? domainData.technicalContact.name : ''}</td>
                <td className='border border-solid border-slate-700 bg-slate-800 px-4 py-2 text-sm'>{domainData.administrativeContact ? domainData.administrativeContact.name : ''}</td>
                <td className='border border-solid border-slate-700 bg-slate-800 px-4 py-2 text-sm rounded-br-xl'>{domainData.contactEmail}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;
