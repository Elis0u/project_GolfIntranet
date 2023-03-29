import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { signup, signin } from "../../services/api.js"
import { useDispatch } from "react-redux";
import { signIn } from "../../store/slices/user";
import style from "./signForm.module.css";

function SignForm() {
    const { state } = useLocation();
    const type = state?.type || "se connecter";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [msg, setMsg] = useState(null);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        phone: "",
        handicap: "",
        termsAccepted: false,
    });
    const { email, password, firstName, lastName, birthDate, phone, handicap, termsAccepted } = inputs;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = e.target.type === 'checkbox' ? e.target.checked : value;
        setInputs({ ...inputs, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        type === "se connecter" ?
            handleSignIn()
            :
            handleSignUp();
    };

    const handleSignIn = async () => {
        try {
            const res = await signin(inputs);
            localStorage.setItem("auth", res.data.result.TOKEN);
            localStorage.setItem("user", JSON.stringify({
                email: res.data.result.email,
                lastName: res.data.result.lastName,
                firstName: res.data.result.firstName,
                avatarName: res.data.result.avatarName
            }));
            dispatch(signIn({
                email: res.data.result.email,
                lastName: res.data.result.lastName,
                firstName: res.data.result.firstName,
                avatarName: res.data.result.avatarName
            }));
            navigate("/");

        } catch (err) {
            setMsg("problème d'identifiant");
        }
    };

    const handleSignUp = async () => {
        try {
            const res = await signup(inputs);
            if (res.status === 201) {
                setInputs({ email: "", password: "", firstName: "", lastName: "", birthDate: "", phone: "", handicap: "", termsAccepted: false });
                navigate("/entry", { state: { type: "se connecter" } });
                setMsg("Votre compte à bien été crée, la validation peut prendre jusqu'à 24h");
            }
        } catch (err) {
            console.error(err);
            setMsg("Erreur lors de l'inscription. Veuillez réessayer.");
        }
    };

    const handleFocus = (e) => {
        const label = e.target.previousElementSibling;
        label.classList.add(style.active);
    };

    const handleBlur = (e) => {
        const label = e.target.previousElementSibling;
        if (e.target.value === "") {
            label.classList.remove(style.active);
        }
    };

    const setDefaultDate = (e) => {
        if (e.target.value === "") {
            e.target.value = "2010-01-01";
        }
    };

    return (
        <>
            {type === "se connecter" ? (
                <h2>Connexion</h2>
            ) : (
                <h2>Inscription</h2>
            )}

            <form className={style.signForm} onSubmit={handleSubmit}>
                <div className={style.inputGroup}>
                    <label htmlFor="email" className={style.signForm_label}>
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleInputChange}
                        className={style.signForm_input}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="password" className={style.signForm_label}>
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleInputChange}
                        className={style.signForm_input}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                </div>

                {type === "s'enregistrer" && (
                    <>
                        <div className={style.inputGroup}>
                            <label htmlFor="lastName" className={style.signForm_label}>Nom</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={lastName}
                                className={style.signForm_input}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="firstName" className={style.signForm_label}>Prénom</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={firstName}
                                className={style.signForm_input}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="birthDate" >Date d'anniversaire</label>
                            <input
                                type="date"
                                name="birthDate"
                                id="birthDate"
                                value={birthDate}
                                className={style.signForm_input}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                onClick={setDefaultDate}
                                required
                            />
                        </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="phone">Numéro de téléphone</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={phone}
                                className={style.signForm_input}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                pattern="^(?:0\d\s?){1}\d{2}(?:\s?\d{2}){3}$"
                                placeholder="06 00 00 00 00"
                                required
                            />
                        </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="handicap" className={style.signForm_label}>Handicap</label>
                            <input
                                type="text"
                                name="handicap"
                                id="handicap"
                                value={handicap}
                                className={style.signForm_input}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={`${style.inputGroup} ${style.termsAccepted}`}>
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                id="termsAccepted"
                                checked={termsAccepted}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="termsAccepted" >
                                J'accepte les{" "}
                                <a href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">
                                    politiques de confidentialité
                                </a>{" "}
                                et les{" "}
                                <a href="/mentions-legales" target="_blank" rel="noopener noreferrer">
                                    mentions légales
                                </a>
                            </label>
                        </div>
                    </>
                )}

                <input type="submit" value={type} className={style.submitButton} />
            </form>

            {msg && <p>{msg}</p>}

            {type === "se connecter" ? (
                <p>
                    Vous n'avez pas de compte ? {" "}
                    <Link
                        to={"/entry"}
                        state={{ type: "s'enregistrer" }}
                    >
                        Inscrivez-vous
                    </Link>
                </p>
            )
            : (
                <p>
                    Déjà un compte ? {" "}
                    <Link
                        to={"/entry"}
                        state={{ type: "se connecter" }}
                    >
                        Connectez-vous
                    </Link>
                </p>
            )}
        </>
    );
}

export default SignForm;
