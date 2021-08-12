import { useEffect, useState, useContext } from "react";
import {
	IonModal,
	IonContent,
	IonPage,
	IonRow,
	IonCol,
	IonButton,
	IonCard,
	IonGrid,
	useIonAlert,
	IonSelect,
	IonSelectOption,
} from "@ionic/react";
import {
	Icon,
	TagTitle,
	TitleInput,
	DescriptionInput,
	LinkInput,
	ModalContent,
	ModalContentView,
	ButtonsWrapper,
	SmallIcon
} from '../components/ProjectCardStyles';
import styled from "styled-components";
import { addCircleOutline } from "ionicons/icons";
import SectionTitle from "../components/SectionTitle.component";
import EditableProjectCard from "../components/EditableProjectCard.component";
import Searchbar from '../components/Searchbar.component';
import Header from '../components/Header.component';
import { useJwt } from "react-jwt";
import GlobalContext from "../utils/state/GlobalContext";
import './Projects.css';
import dbtopics from "../utils/topics.json";
import dblanguages from "../utils/languages.json";
import { checkmark, close } from 'ionicons/icons';

const Container = styled.div`
  padding: 1rem;
`;

const CreateCard = styled(IonCard)`
	cursor: pointer;
	border-radius: 2rem;
  	background-color: #D4E0FF;
	box-shadow: none;
	height: 93%;
	display: flex;
	min-height: 200px;

	&:hover {
	background-color: #c2d0f3;
	}
`;

function Projects() {
	const [search, setSearch] = useState('')
	const [showProject, setShowProject] = useState(false);
	const [mTitle, setMTitle] = useState("");
	const [mDescription, setMDescription] = useState("");
	const [mUrl, setMUrl] = useState("");
	const [mTopics, setMTopics] = useState([""]);
	const [mLanguages, setMLanguages] = useState([""]);

	const [edited, setEdited] = useState("");
	const [projects, setProjects] = useState([]);

	const { state } = useContext(GlobalContext);
	const { decodedToken } = useJwt(state.token);
	const [present] = useIonAlert()

	useEffect(() => {
		if (decodedToken) {
			fetch("/api/getProjects").then(res => res.json()).then(data => {
				const projs = data.projects.filter((proj) => proj.owner === decodedToken?.username)
				setProjects(projs)
			})
		}
	}, [decodedToken, edited])

	function saveChanges() {
		if (!mTitle || !mDescription || !mUrl) {
			return present({
				header: "Please fill out all the fields!",
				buttons: [
					'Ok'
				]
			})
		} else {
			
			let opts = {
				'title': mTitle,
				'description': mDescription,
				'url': mUrl,
				'owner': decodedToken.username
			}
			fetch('/api/addProject', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(opts)
			}).then(r => r.json())
				.then(resp => {
					console.log(resp)


				}).then(() => {
					return present({
						header: "Project created!",
						buttons: [
							{
								text: 'Ok', handler: (d) => {
									setShowProject(false)
									setMTitle("")
									setMDescription("")
									setMUrl("")
									setEdited(mTitle)
								}
							}
						]
					})
				})
			// mLanguages.forEach(function (lang) {
			// 	fetch('/api/addProjectLanguage', {
			// 		method: 'POST',
			// 		headers: {
			// 		'Content-Type': 'application/json'
			// 		},
			// 		body: JSON.stringify({
			// 		// 'projectId': ,
			// 		'language': lang
			// 		})
			// 	}).then(r => r.json())
			// 		.then(resp => {
			
			// 		if (resp.status === "ok") {
			// 			console.log(resp.message)
			// 		}
			// 		else {
			// 			console.log(resp.error)
			// 		}
			// 		})
			// 	})
			
			// mTopics.forEach(function (topic) {
			// 	fetch('/api/addProjectTopic', {
			// 		method: 'POST',
			// 		headers: {
			// 		'Content-Type': 'application/json'
			// 		},
			// 		body: JSON.stringify({
			// 		// 'projectId': ,
			// 		'topic': topic
			// 		})
			// 	}).then(r => r.json())
			// 		.then(resp => {
			
			// 		console.log(topic)
			// 		if (resp.status === "ok") {
			// 			console.log(resp.message)
			// 		}
			// 		else {
			// 			console.log(resp.error)
			// 		}
			// 		})
				// })
		}
	}



	return (
		<IonPage>
			<Header />
			<IonContent fullscreen>
				<Container>

					{/* Search Bar */}
					<section>
						<Searchbar placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
					</section>


					{/* Projects */}
					<section>
						<SectionTitle>Your Projects</SectionTitle>
						<IonGrid>
							<IonRow>
								<IonCol size="12" size-md="4">
									<IonModal id="projmod" isOpen={showProject}>
										<ModalContent>
												<TitleInput
													value={mTitle}
													placeholder="Title"
													onIonChange={(e) => {
														setMTitle(e.target.value)
													}}
													type="text"
													maxlength={30}
												/>
												<DescriptionInput
													value={mDescription}
													placeholder="Description"
													onIonChange={(e) => {
														setMDescription(e.target.value)
													}}
													rows={10}
													maxlength={470}
												/>

												<LinkInput
													placeholder="URL"
													value={mUrl}
													onIonChange={(e) => {
														setMUrl(e.target.value)
													}}
													rows={1}
													maxlength={47}
												/>

												<TagTitle>Languages</TagTitle>
												<IonSelect style={{ height: "40px", width: "500px", marginLeft: "20px" }} value={mLanguages} multiple={true} cancelText="Close" okText="Done" placeholder="Select language(s)"
													onIonChange={e => (setMLanguages(e.target.value))}>
													{
														dblanguages.map(topic =>
															<IonSelectOption key={topic} value={topic}>{topic}</IonSelectOption>
														)
													}
												</IonSelect>

												<TagTitle>Tags</TagTitle>

												<IonSelect style={{ height: "40px", width: "500px", marginLeft: "20px" }} value={mTopics} multiple={true} cancelText="Close" okText="Done" placeholder="Select tag(s)"
													onIonChange={e => (setMTopics(e.target.value))}>
													{
														dbtopics.map(topic =>
															<IonSelectOption key={topic} value={topic}>{topic}</IonSelectOption>
														)
													}
												</IonSelect>

												<ButtonsWrapper>
													<IonButton color="success" id="closemodal" onClick={saveChanges}>
														<SmallIcon slot="start" icon={checkmark} />
														Save
													</IonButton>
													<IonButton style={{ marginBottom: "50px" }} id="closemodal" onClick={() => setShowProject(false)}>
														<SmallIcon slot="start" icon={close} />
														Close
													</IonButton>
												</ButtonsWrapper>

										</ModalContent>
									</IonModal>

									<CreateCard class="ion-align-items-center ion-justify-content-center"
										onClick={() => setShowProject(true)}>
										<Icon icon={addCircleOutline} />
									</CreateCard>
								</IonCol>
								{projects ? projects.map((project) => {
									const { id, title, description, date, url, owner } = project;
									return (
										<EditableProjectCard
											key={id}
											title={title}
											description={description}
											date={date}
											url={url}
											owner={owner}
											id={id}
											editFunc={setEdited}
										/>

									);
								}) : <div></div>}

							</IonRow>
						</IonGrid>
					</section>
				</Container>
			</IonContent>
		</IonPage >
	);
}

export default Projects;
