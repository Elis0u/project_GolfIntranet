import {useEffect, useState} from 'react';
import style from "./document.module.css";
import { getDatas } from '../../services/api.js';
import ReactPaginate from 'react-paginate';

function Documents() {
  
  const [documents, setDocuments] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const documentsPerPage = 4;

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

  const pagesVisited = pageNumber * documentsPerPage;
  const pageCount = documents ? Math.ceil(documents.length / documentsPerPage) : 0;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
                  documents.slice(pagesVisited, pagesVisited + documentsPerPage).map(d => {
                        return (
                            <article key={d.id}>
                                <h3>{d.title}</h3>
                                <p>{d.content.slice(0, 200)} ...</p>
                                <p className={style.publish}>Ecrit par {d.firstName} {d.lastName} le <time dateTime={d.createdAt}>{new Date(d.createdAt).toLocaleDateString()} à {new Date(d.createdAt).toLocaleTimeString()}</time>.</p>
                                <p className={`${style.category} ${getCategory(d.label)}`}>{d.label}</p>
                            </article>
                        )
                    })
                    :
                    null
            }
                  <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={style.pagination}
                    previousLinkClassName={style.previousPage}
                    nextLinkClassName={style.nextPage}
                    disabledClassName={style.paginationDisabled}
                    activeClassName={style.paginationActive}
                  />
	
		</main>
    )
}

export default Documents;