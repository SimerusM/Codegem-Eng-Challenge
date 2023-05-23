import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardHeader, CardBody, CardSection, CardFooter, CardInfo } from "./components/card";
import { Selector } from "./components/emoji-selector";
import { Selector as TagSelector } from "./components/tag-selector";
import { Button, ButtonContainer } from "./components/button";
import ApiService from "./services/api";
import FeedbackValidator from "./validators/feedback";
import { Container } from './components/container';
import styled from '@emotion/styled';
import { Textarea } from './components/textarea';
import Roboto from "./assets/fonts/Roboto-Regular.ttf";
import { Toast } from './components/center-toast';
import Calendar, { LongestStreak, CurrentStreak } from './components/calendar';


let div = document.createElement("div");
const source = window.location.href;

const CustomContainer = styled(Container)`
    min-height: 50px;
    margin-top: 10px;
`;

const CustomTextArea = styled(Textarea)`
    margin-top: 10px;
    height: 80px;
`;

const App = () => {
    let [tags, setTags] = useState([{name: "Mentorship"}, {name: "Collaboration"}, {name: "Feedback"}, {name: "Impactful Work"}, {name: "Kind Words"}, {name: "Learning"}, {name: "Other"}]);
    let [moods, setEmoji] = useState([]);
    let [feedback, setFeedback] = useState("");
    let [saving, setSaving] = useState(false);
    let [errors, setErrors] = useState(null);
    let [showSuccess, setShowSuccess] = useState(false);
    let [showDiary, setShowDiary] = useState(false);

    const onTagClicked = (tag) => {
        tag.active = !tag.active;
        setTags([...tags]);
    };

    const removeEmoji = (emoji) => {
        let idx = moods.indexOf(emoji);
        moods.splice(idx, 1);
        setEmoji([...moods]);
    };

    const addEmoji = (emoji) => {
        if (moods.indexOf(emoji) < 0) {
            moods.push(emoji);
            setEmoji([...moods]);
        }
    };

    const removeTag = (tag) => {
        onTagClicked(tag);
    };

    const submitForm = () => {
        let formValid = FeedbackValidator.validate(feedback, moods, tags);
        setErrors(null);

        if (formValid.valid) {
            setSaving(true);
            ApiService.post("/feedback", { moods: moods.map(e => e.display), tags: tags.filter(t => t.active), feedback, source })
                .then(() => {
                    setSaving(false);
                    setEmoji([]);
                    setTags([...tags.map(t => {
                        t.active = false;
                        return t;
                    })]);
                    setFeedback("");
                    setShowSuccess(true);

                    setTimeout(() => setShowSuccess(false), 1000);
                });
        } else {
            setErrors(formValid);
        }
    };

    return (
        <div>
            {showDiary ? (
                <div>
                    <Card>
                        <CardHeader dismissible>
                            My Log
                        </CardHeader>
                        <CardBody>
                            <CardSection>
                                <div style={{textAlign: "center"}}>
                                    Way to go!
                                </div>
                                <div style={{textAlign: "center", fontSize: "15px", padding: "5px"}}>
                                    You've completed your daily checkin
                                </div>
                                <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "1vh"}}>
                                    <div style={{padding: "10px", backgroundColor: "#34eba8", borderRadius: "10px"}}>
                                        <div style={{textAlign: "center", fontSize: "10px", color: "whitesmoke"}}>
                                            Daily Checkin
                                        </div>
                                        <div>
                                            <div style={{textAlign: "center", fontSize: "15px", marginTop: "5px", color: "whitesmoke"}}>
                                                Finished!
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{padding: "10px", backgroundColor: "#3483eb", borderRadius: "10px"}}>
                                        <div style={{textAlign: "center", fontSize: "10px", color: "whitesmoke"}}>
                                            Current Streak
                                        </div>
                                        <div style={{textAlign: "center", fontSize: "15px", marginTop: "5px", color: "whitesmoke"}}>
                                            <CurrentStreak />
                                        </div>
                                    </div>

                                    <div style={{padding: "10px", backgroundColor: "#c4a9c9", borderRadius: "10px"}}>
                                        <div style={{textAlign: "center", fontSize: "10px", color: "whitesmoke"}}>
                                            Longest Streak
                                        </div>
                                        <div style={{textAlign: "center", fontSize: "15px", marginTop: "5px", color: "whitesmoke"}}>
                                            <LongestStreak />
                                        </div>
                                    </div>
                                </div>
                            </CardSection>
                            <CardSection style={{height: "50vh"}}>
                                <Calendar/>
                            </CardSection>
                            <CardSection>

                            </CardSection>
                        </CardBody>
                    </Card>
                </div>
            ) : (
                <div>
                    <Card>
                        <Toast content="Your feedback has been submitted successfully." show={showSuccess} />
                        <CardHeader dismissible>
                            Let's Reflect.
                        </CardHeader>
                        <CardBody>
                            <CardSection>
                                <CardInfo>How are you feeling now?</CardInfo>
                                <Selector selected={moods} onEmojiRemoved={removeEmoji} addEmoji={addEmoji} error={errors && !errors.moods} />
                            </CardSection>
                            <CardSection>
                                <CardInfo>What inspired that?</CardInfo>
                                <Container flex>
                                    <TagSelector dismissOverride={false} onTagClicked={onTagClicked} selected={tags} />
                                </Container>
                            </CardSection>
                            <CardSection>
                                <CardInfo>Your findings</CardInfo>
                                <CustomContainer bordered>
                                    <TagSelector dismissOverride={true} onTagRemoved={removeTag} selected={tags.filter(t => !!t.active)} />
                                </CustomContainer>
                            </CardSection>
                            <CardSection>
                                <CardInfo>Would you like to share more?</CardInfo>
                                <CustomTextArea bordered full error={errors && !errors.feedback} value={feedback} onChange={e => setFeedback(e.target.value)} />
                            </CardSection>
                        </CardBody>
                        <CardFooter>
                            <ButtonContainer>
                                <Button onClick={() => setShowDiary(true)} disabled={saving}>My Diary</Button>
                                <Button onClick={submitForm} disabled={saving}>Submit</Button>
                            </ButtonContainer>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
};

// add fonts
let fontFace = new FontFace("Roboto", `url(${IS_PRODUCTION ? browser.runtime.getURL('fonts/Roboto-Regular.ttf') : Roboto})`);
document.fonts.add(fontFace);

// add form to the page
div.id = "code-gem";
div.style.position = "fixed";
div.style.top = "20px";
div.style.right = "10px";
div.style.zIndex = "999";
div.style.maxHeight = "90vh";
div.style.height = "800px";
div.style.transition = "transform 0.3s ease-in";
div.style.fontFamily = `'Roboto'`;


// allow user to dismiss the feedback form
let listener = div.addEventListener("click", (e) => {
    if (e.target.className.indexOf("card-dismiss") >= 0) {
        div.style.transform = "translateX(370px)";
        div.removeEventListener("click", listener);
    }
});

document.body.appendChild(div);

ReactDOM.render(<App />, div);