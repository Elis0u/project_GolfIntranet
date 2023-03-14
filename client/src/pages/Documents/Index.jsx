import {useEffect, useState} from 'react';
import style from "./document.module.css";
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

  function getCategory(category) {
    switch (category) {
      case 'Règlement':
        return style['rules'];
      case 'mental':
        return style['mental'];
      default:
        return '';
    }
  }

    return (
		<main className={style.container}>		
			
            <h2>Documents</h2>

            {
                documents ?
                    documents.map(d => {
                        return (
                            <article key={d.id}>
                                <h3>{d.title}</h3>
                                <p>{d.content.slice(0, 200)} ...</p>
                                <p>Ecrit par {d.firstName} {d.lastName} le <time datetime={d.createdAt}>{new Date(d.createdAt).toLocaleDateString()} à {new Date(d.createdAt).toLocaleTimeString()}</time>.</p>
                                <p className={getCategory(d.label)}>{d.label}</p>
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