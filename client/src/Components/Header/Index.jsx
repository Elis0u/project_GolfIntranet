import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline, IoPeopleOutline, IoCalendarOutline, IoFolderOpenOutline, IoBarChartOutline, IoHammerOutline } from "react-icons/io5";
// import logo from "../../assets/img/autres/logo.png";
import style from "./header.module.css";
import { signOut } from "../../store/slices/user";
import React from "react";

function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state);
    console.log("index header console log -> ", user)

    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(signOut());
        navigate("/login");
    }

    const [anim, setAnim] = useState(false);
    const ToggleClass = () => {
        setAnim(!anim);
    };

    return (
        <header>

            <button className={`${style.burger} ${anim ? style.activeBurger : ""}`} onClick={ToggleClass}>
                <div className={style.ligne}></div>
            </button>

            <nav className={anim ? style.menuActive : ""}>
                <div className={style.navHeader}>
                    <h1>Equipe femme</h1>
                    <span>Golf de Granville</span>
                </div>
                <div className={style.navProfil}>
                    {/* TODO Put dynamic img and span */}
                    <img src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                    <span>Elisa Dadure</span>
                    <div className={style.navActions}>
                        <NavLink to="/user">Mon compte</NavLink>
                        <NavLink to="/user">Déconnexion</NavLink>
                    </div>
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
                        <NavLink to="/document" className={(navItem) => navItem.isActive ? style.active : ""}>< IoFolderOpenOutline /> Documents</NavLink>
                    </li>
                    <li>
                        <NavLink to="/poll" className={(navItem) => navItem.isActive ? style.active : ""}>< IoBarChartOutline /> Sondage</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin" className={(navItem) => navItem.isActive ? style.active : ""}>< IoHammerOutline /> Admin</NavLink>
                    </li>
                </ul>

                <div className={style.navFooter}>
                    <p>Développé par <a href="https://github.com/Elis0u">Elis0u</a></p>
                </div>
            </nav>

            {/* <Link to={"/cart"} className={style.banCart}>
                <FontAwesomeIcon icon={faCartShopping} className={style.cartIcon} />
                <span>{cart.totalAmount}€</span>
            </Link>

            <Link to="/">
                <h1>
                    <img src={logo} alt="Vers la page d'accueil" />
                </h1>
            </Link>

            <nav>
                <NavLink to="/tea">thés</NavLink>
                <NavLink to="/about">notre histoire</NavLink>

                { !user.isLogged ? 
                    <NavLink to="/entry" state={{type: "se connecter"}}>Connexion</NavLink>
                    :
                    <>
                    <NavLink to="/dashboard" >Compte</NavLink>
                    <button className={style.CTA_signOut} onClick={handleSignOut}>Déconnexion</button>
                    </>
                    
                }
            </nav> */}

        </header>
    );
}

export default Header;
