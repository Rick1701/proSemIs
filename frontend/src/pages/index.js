import React, { useEffect, useState } from 'react';

const Home = () => {
  const [htmlContents, setHtmlContents] = useState([]);

  useEffect(() => {
    const fetchHtmlContents = async () => {
      const fileNames = [

        'index.html'

      ]; // Agrega aquí los nombres de los archivos HTML que deseas cargar

      const htmlPromises = fileNames.map(async (fileName) => {
        const response = await fetch(`/html/${fileName}`);
        const html = await response.text();
        return { fileName, html };
      });

      const htmlData = await Promise.all(htmlPromises);
      setHtmlContents(htmlData);
    };

    fetchHtmlContents();
  }, []);

  return (
    <div>
      {htmlContents.map((htmlData) => (
        <div key={htmlData.fileName} dangerouslySetInnerHTML={{ __html: htmlData.html }} />
      ))}
      
    </div>
  );
};

export default Home;