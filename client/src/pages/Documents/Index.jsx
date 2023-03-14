import {useEffect, useState} from 'react';
import { getDatas } from '../../services/api.js';

function Documents() {
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
  
      async function fetchData(){
          try{
              const documents = await getDatas("/documents");
  
              setDocuments(documents.data.result);

          } catch(err){
              throw new Error(err);
          }
          
      }
      fetchData();
  }, []);

  console.log( "All doc -> " , documents);

    return (
		<main>		
			
            <h2>Documents</h2>

            {
                documents ?
                    documents.map(d => {
                        return (
                            <article key={d.id}>
                                <h3>{d.title}</h3>
                                <p>{d.content}</p>
                                <p><time datetime={d.createdAt}>{new Date(d.createdAt).toLocaleDateString()} à {new Date(d.createdAt).toLocaleTimeString()}</time></p>
                                <p>{d.firstName} {d.lastName}</p>
                                <p>{d.label}</p>
                            </article>
                        )
                    })
                    :
                    null
            }
	
		</main>
    )
}

export default Documents;