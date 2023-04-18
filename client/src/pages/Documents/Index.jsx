import { useEffect, useState } from 'react';
import style from "./document.module.css";
import { getDatas } from '../../services/api.js';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Documents() {

  const [documents, setDocuments] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const documentsPerPage = 4;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {

    async function fetchData() {
      try {
        const documents = await getDatas("/documents");

        setDocuments(documents.data.result);

      } catch (err) {
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

  function getCategory(category) {
    switch (category) {
      case 'Règlement':
        return style['rules'];
      case 'Mental':
        return style['mental'];
      case 'Routine':
        return style['routine'];
      default:
        return '';
    }
  }

  const openModal = (document) => {
    setSelectedDocument(document);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedDocument(null);
    setModalIsOpen(false);
  };

  return (
    <main className={style.container}>

      <h2>Documents</h2>

      {
        documents
          ? documents
            .slice(pagesVisited, pagesVisited + documentsPerPage)
            .map((d) => {
              return (
                <article key={d.id} onClick={() => openModal(d)}>
                  <h3>{d.title}</h3>
                  <p>{d.content.slice(0, 200)} ...</p>
                  <p className={style.publish}>
                    Ecrit par{" "}
                    {d.user_id
                      ? `${d.firstName} ${d.lastName}`
                      : "un ancien utilisateur"}{" "}
                    le{" "}
                    <time dateTime={d.createdAt}>
                      {new Date(d.createdAt).toLocaleDateString()} à{" "}
                      {new Date(d.createdAt).toLocaleTimeString()}
                    </time>
                    .
                  </p>
                  <p className={`${style.category} ${getCategory(d.label)}`}>{d.label}</p>
                </article>
              );
            })
          : null
      }
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Document Details"
        className={style.modalContent}
        overlayClassName={style.modalOverlay}
      >
        {selectedDocument && (
          <div>
            <h3>{selectedDocument.title}</h3>
            <p>{selectedDocument.content}</p>
            <p className={style.publish}>
              Ecrit par{" "}
              {selectedDocument.user_id
                ? `${selectedDocument.firstName} ${selectedDocument.lastName}`
                : "un ancien utilisateur"}{" "}
              le{" "}
              <time dateTime={selectedDocument.createdAt}>
                {new Date(selectedDocument.createdAt).toLocaleDateString()} à{" "}
                {new Date(selectedDocument.createdAt).toLocaleTimeString()}
              </time>
              .
            </p>
            <p className={`${style.category} ${getCategory(selectedDocument.label)}`}>
              {selectedDocument.label}
            </p>
          </div>
        )}
        <button onClick={closeModal}>Fermer</button>
      </Modal>
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