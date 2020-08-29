// eslint-disable-next-line no-undef
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const synthesis = window.speechSynthesis;

const recognition = new speechRecognition();

// Controls whether continuous results are captured (true)
// or just a single result each time recognition is started (false).
recognition.continuous = false;
// Defines whether the speech recognition system should return interim results, or just final results.
recognition.interimResults = false;
recognition.lang = 'en-US';
// For the text it wont recognize good, it has alternative texts similar to the one that has been said from the user.
recognition.maxAlternatives = 1;

export const VoiceAssistant = (props) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const history = useHistory();
    const [english, setEnglish] = useState(true);

    function handleSpeech(event) {
        event.preventDefault();
        recognition.start();

        if (english) {
            setEnglish(prevState => false);
            assistantSpeak(greetUser())
        }
        recognition.onresult = function (event) {
            // returns SpeechRecognitionList object that contains SpeechRecognitionResult objects.
            // Because it is list, it can be accessed like an array with [0].
            // This positions contains objects that is SpeechRecognitionAlternative.
            let text = event.results[0][0].transcript;

            if (text !== "") {
                let navigation = "";
                let checkAuthentication = true;
                if (currentUser === null) {
                    checkAuthentication = false;
                }
                if (text.includes("open") || text.includes("redirect") || text.includes("page")) {
                    if (text.includes("log in") || text.includes("sign in") || text.includes("login")
                        || text.includes("signin")) {
                        navigation = "/log-in"
                    } else if (text.includes("register") || text.includes("signup") || text.includes("sign up")) {
                        navigation = "/register"
                    } else if (text.includes("profile")) {
                        navigation = "/profile";
                        if (!checkAuthentication) {
                            assistantSpeak(userNotLoggedIn(), navigation);
                            return
                        }
                    } else if (text.includes("change password")) {
                        navigation = "/change-password";
                        if (!checkAuthentication) {
                            assistantSpeak(userNotLoggedIn(), navigation);
                            return
                        }
                    } else if (text.includes("edit profile") || text.includes("update profile")) {
                        navigation = "/update-profile";
                        if (!checkAuthentication) {
                            assistantSpeak(userNotLoggedIn(), navigation);
                            return
                        }
                    } else if (text.includes("salad") || text.includes("salads")) {
                        navigation = "/menu/salads"
                    } else if (text.includes("appetizer") || text.includes("appetizers")) {
                        navigation = "/menu/cold-and-hot-appetizers"
                    } else if (text.includes("grill") || text.includes("grills")) {
                        navigation = "/menu/grill"
                    } else if (text.includes("garnish") || text.includes("extra") || text.includes("garnish and extras")
                        || text.includes("extras")) {
                        navigation = "/menu/garnish-and-extras"
                    } else if (text.includes("dessert") || text.includes("desserts") || text.includes("snack")
                        || text.includes("snacks")) {
                        navigation = "/menu/desserts-and-snacks"
                    } else if (text.includes("drink") || text.includes("drinks")) {
                        navigation = "/menu/drinks"
                    } else if (text.includes("dishes") || text.includes("dish") || text.includes("dishes to order")) {
                        navigation = "/menu/dishes-to-order"
                    } else if (text.includes("specialities") || text.includes("specialities of the house")) {
                        navigation = "/menu/specialities-of-the-house"
                    } else if (text.includes("aboutus") || text.includes("about us")) {
                        navigation = "/about-us"
                    } else if (text.includes("home")) {
                        navigation = "/home"
                    } else if (text.includes("reservation")) {
                        navigation = "/log-in";
                        if (checkAuthentication) {
                            if (currentUser.reservation === null) {
                                navigation = "/reservation"
                            } else {
                                navigation = "/my-reservation"
                            }
                        } else {
                            assistantSpeak(userNotLoggedIn(), navigation);
                            return
                        }
                    } else {
                        assistantSpeak(handleErrorOpen(checkAuthentication), "")
                        return;
                    }
                    // else if (text.includes("logoff") || text.includes("log off")
                    //     || text.includes("logout") || text.includes("log out")) {
                    //     alert("ajde be");
                    //     if (checkAuthentication) {
                    //         assistantSpeak(logOff(), "");
                    //         userLogOff();
                    //     } else {
                    //         navigation = "/log-in";
                    //         assistantSpeak(userNotLoggedIn(), navigation);
                    //     }
                    // }
                    assistantSpeak(confirmAction(checkAuthentication), navigation)
                } else {
                    assistantSpeak(textNotRecognized(), "");
                }
            }
        };
    }

    function handleErrorOpen(checkAuthentication) {
        if (checkAuthentication) {
            return currentUser.name.split(" ")[0] + ", please specify the page you want me to open for you."
        } else {
            return "Sir, please specify the page you want me to open for you."
        }
    }

    function assistantSpeak(paramFunction, navigation) {
        // utterance.voice = voice;
        // utterance.pitch = 1.5;
        // utterance.rate = 1.25;
        // utterance.volume = 0.8;
        let synthText = new SpeechSynthesisUtterance(paramFunction);
        synthesis.speak(synthText);
        if (navigation !== "") {
            history.push(navigation);
        }
    }

    function textNotRecognized() {
        return "Sorry, can you reapeat what u said please ? Use the key words " +
            "OPEN, REDIRECT and PAGE. For example, tell me to OPEN SALAD MENU!"
    }

    function userNotLoggedIn() {
        return "Sorry sir, but in order to complete this action you must log in."
    }

    function logOff() {
        return "Sure, i can do that."
    }

    function confirmAction(checkAuthentication) {
        if (checkAuthentication) {
            return "Of course " + currentUser.name.split(" ")[0] + ". Anything else you need ?"
        } else {
            return "Of course sir. Anything else you need ?";
        }
    }

    function greetUser() {
        if (currentUser !== null) {
            return "Hello " + currentUser.name.split(" ")[0] + ". How can i help you?"
        } else {
            return "Hello sir. How can i help you?";
        }
    }

    return (
        <li className="nav-item" onClick={handleSpeech}>
            <Link className="nav-link" href="#">
                <i className="fa fa-microphone">
                </i>
                Click me!
            </Link>
        </li>
    )
};