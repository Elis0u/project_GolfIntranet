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
    });
    const { email, password, firstName, lastName } = inputs;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
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
            const res = await signin(inputs); // envoyer des inputs "sains/nettoyés"
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
                setInputs({ email: "", password: "", firstName: "", lastName: "" });
                navigate("/entry", { state: { type: "se connecter" } });
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

    return (
        <>
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
                    </>
                )}

                <input type="submit" value={type} className={style.submitButton} />
            </form>

            {msg && <p>{msg}</p>}

            {type === "se connecter" && (
                <p>
                    Vous n'avez pas de compte ? {" "}
                    <Link
                        to={"/entry"}
                        state={{ type: "s'enregistrer" }}
                    >
                        Inscrivez-vous
                    </Link>
                </p>
            )}
        </>
    );
}

export default SignForm;
