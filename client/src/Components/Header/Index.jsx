import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline, IoPeopleOutline, IoCalendarOutline, IoFolderOpenOutline, IoHammerOutline } from "react-icons/io5";
// import logo from "../../assets/img/autres/logo.png";
import style from "./header.module.css";
import { signOut } from "../../store/slices/user";
import React from "react";

function Header() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(signOut());
        localStorage.removeItem("auth");
        localStorage.removeItem("user")
        navigate("/entry");
    }

    const [anim, setAnim] = useState(false);
    const ToggleClass = () => {
        setAnim(!anim);
    };

    return (
        <header className={style.leftHeader}>

            <button className={`${style.burger} ${anim ? style.activeBurger : ""}`} onClick={ToggleClass}>
                <div className={style.ligne}></div>
            </button>

            <nav className={`${style.navGeneral} ${anim ? style.menuActive : ""}`}>

                <div className={style.navHeader}>
                    <h1>Equipe femme</h1>
                    <span>Golf de Granville</span>
                </div>

                <div className={style.navProfil}>
                    <figure>
                        <img src={`/img/avatar_user/${user.infos && user.infos.avatarName ? user.infos.avatarName : "default.jpg"}`} alt="avatar de profil" />
                        <figcaption>{user.infos ? `${user.infos.lastName} ${user.infos.firstName}` : ""}</figcaption>
                    </figure>

                    <nav className={style.navActions}>
                        <NavLink to="/account">Mon compte</NavLink>
                        <button className={style.btnSignout} onClick={handleSignOut}>Déconnexion</button>
                    </nav>
                </div>

                <ul className={style.navList}>
                    <li>
                        <NavLink to="/" className={(navItem) => navItem.isActive ? style.active : ""}>< IoHomeOutline /> Accueil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/team" className={(navItem) => navItem.isActive ? style.active : ""}>< IoPeopleOutline /> Equipe</NavLink>
                    </li>
                    <li>
                        <NavLink to="/event" className={(navItem) => navItem.isActive ? style.active : ""}>< IoCalendarOutline /> Evenement</NavLink>
                    </li>
                    <li>
                        <NavLink to="/documents" className={(navItem) => navItem.isActive ? style.active : ""}>< IoFolderOpenOutline /> Documents</NavLink>
                    </li>
                    {user.infos?.isAdmin ? (
                        <li>
                            <NavLink to="/admin" className={(navItem) => navItem.isActive ? style.active : ""}>< IoHammerOutline /> Admin</NavLink>
                        </li>
                    )
                        :
                        ""}
                </ul>


                <p className={style.navFooter}>Développé par <a href="https://github.com/Elis0u">Elis0u</a></p>

            </nav>

        </header>
    );
}

export default Header;
