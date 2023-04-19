import React from "react";
import { useSelector } from "react-redux";
import style from "./accountPage.module.css";
import { AiOutlineEdit } from "react-icons/ai";

function AccountPage() {
  const user = useSelector((state) => state.user.infos);

  return (
    <main className={style.ctnDashboard}>
      <h2>DashBoard {user.firstName}</h2>

      <div className={style.ctnSection}>

        <section className={style.userInfo}>
          <button><AiOutlineEdit /></button>
          <h3>Vos informations</h3>

          <dl>
            <dt>Email :</dt>
            <dd>{user.email}</dd>

            <dt>Prénom :</dt>
            <dd>{user.firstName}</dd>

            <dt>Nom :</dt>
            <dd>{user.lastName}</dd>

            <dt>Date de naissance :</dt>
            <dd>{new Date(user.birthDate).toLocaleDateString()}</dd>

            <dt>Téléphone :</dt>
            <dd>{user.phone}</dd>

            <dt>Handicap :</dt>
            <dd>{user.handicap}</dd>

          </dl>
        </section>

        <section className={style.activityUser}>
          <h3>Vos activités</h3>
        </section>
        
      </div>

      <section>
        <h3>PELZ stat</h3>
      </section>


    </main>
  );
}

export default AccountPage;