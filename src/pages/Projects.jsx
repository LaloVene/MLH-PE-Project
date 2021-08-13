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
import React from "react";

const Container = styled.div`
  padding: 1rem;
`;

const SearchBarContainer = styled.h1`
  max-width: 20rem;
  font-size: 1rem;
  padding-left: 1rem;
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
	const [searchText, setSearchText] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [showProject, setShowProject] = useState(false);
	const [mTitle, setMTitle] = useState("");
	const [mDescription, setMDescription] = useState("");
	const [mUrl, setMUrl] = useState("");
	const [mTopics, setMTopics] = useState([""]);
	const [mLanguages, setMLanguages] = useState([""]);

	const [tops, setTops]=useState({})
  	const [langs, setLangs]=useState({})
	const [users, setUsers]=useState({})
	const [mCollaborators, setMCollaborators] = useState([""]);


	const [edited, setEdited] = useState("");
	const [projects, setProjects] = useState([]);

	const { state } = useContext(GlobalContext);
	const { decodedToken } = useJwt(state.token);
	const [present] = useIonAlert()

	useEffect(() => {
		if (decodedToken) {
			fetch("/api/getProjects").then(res => res.json()).then(async data => {
				const projs = data.projects.filter((proj) => {
					if (searchText){
						return (proj.owner === decodedToken?.username && proj.title.toLowerCase().includes(searchText.toLowerCase()))
					}
					return proj.owner === decodedToken?.username
				})
				setProjects(projs)
				var langdict={}
				var topdict={}
				var userdict={}
				for (var proj in data.projects) {
					
					let id=data.projects[proj].id;
					await Promise.all([
						fetch('/api/getProjectLanguages', {
							method: 'POST',
							headers: {
							'Content-Type': 'application/json'
							},
							body: JSON.stringify({"projectId":id})
						}),
						fetch('/api/getProjectTopics', {
							method: 'POST',
							headers: {
							'Content-Type': 'application/json'
							},
							body: JSON.stringify({"projectId":id})
						}),
						fetch('/api/getUsersInProject', {
							method: 'POST',
							headers: {
							'Content-Type': 'application/json'
							},
							body: JSON.stringify({"projectId":id})
						})
						]).then(responses =>
						Promise.all(responses.map(response => response.json()))
						).then(data =>{
						const languages = []
						for (var lang in data[0].languages){
							languages.push(data[0].languages[lang].language)
						}
						langdict[id]=languages
          
						const topics = []
						for (var top in data[1].topics){
							topics.push(data[1].topics[top].topic)
						}
						topdict[id]=topics

						const users = []
						for (var us in data[2].users){
							users.push(data[2].users[us].username)
						}
						userdict[id]=users
						
						})
					}

					setTops(topdict)
					setLangs(langdict)
					setUsers(userdict)
					console.log(userdict)
					
							})
						}
					}, [decodedToken, edited,searchText])

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


				}).then(()=>{
					fetch(`/api/getProjects?searchterm=${mTitle}`).then(res => res.json()).then(resp=>{
						var projId=resp.projects[0].id
						console.log(mLanguages)
						console.log(mTopics)
						mLanguages.forEach(function (lang) {
								fetch('/api/addProjectLanguage', {
									method: 'POST',
									headers: {
									'Content-Type': 'application/json'
									},
									body: JSON.stringify({
									'projectId': projId,
									'language': lang
									})
								}).then(r => r.json())
									.then(resp => {
							
									if (resp.status === "ok") {
										console.log(resp.message)
									}
									else {
										console.log(resp.error)
									}
									})
								})
							
							mTopics.forEach(function (topic) {
								fetch('/api/addProjectTopic', {
									method: 'POST',
									headers: {
									'Content-Type': 'application/json'
									},
									body: JSON.stringify({
									'projectId': projId,
									'topic': topic
									})
								}).then(r => r.json())
									.then(resp => {
							
									console.log(topic)
									if (resp.status === "ok") {
										console.log(resp.message)
									}
									else {
										console.log(resp.error)
									}
									})
								})
					})
				})
				
				
				.then(() => {
					return present({
						header: "Project created!",
						buttons: [
							{
								text: 'Ok', handler: (d) => {
									setShowProject(false)
									setMTitle("")
									setMDescription("")
									setMUrl("")
									setMLanguages([""])
									setMTopics([""])
									setEdited(mTitle)

								}
							}
						]
					})
				})
			
		}
	}

	const onChange = (event) => {
		const query = event.target.value;
		setSearchText(query)
	}
	const Search = (event) => {
		event.preventDefault();
		setSearchQuery(searchText)
	}

	return (
		<IonPage>
			<Header />
			<IonContent fullscreen>
				<Container>



					{/* Projects */}
					<section>
						<SectionTitle>Your Projects</SectionTitle>
						{/* Search Bar */}
						<SearchBarContainer>
							<Searchbar placeholder="Search" onChange={(e)=>setSearchText(e.target.value)}  />
						</SearchBarContainer>
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
												maxlength={25}
											/>
											<DescriptionInput
												value={mDescription}
												placeholder="Description"
												onIonChange={(e) => {
													setMDescription(e.target.value)
												}}
												rows={5}
												maxlength={200}
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

											<TagTitle>Collaborators</TagTitle>
											<IonSelect style={{ height: "40px", width: "500px", marginLeft: "20px" }} value={mCollaborators} multiple={true} cancelText="Close" okText="Done" placeholder="Manage collaborator(s)"
												onIonChange={e => (setMCollaborators(e.target.value))}>
												{/* CHANGE THIS to users */}
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
											languages={langs[id]}
                        					topics={tops[id]}
											collabs={users[id]}
										/>

									);
								}) : <div></div>}

							</IonRow>
					</section>
				</Container>
			</IonContent>
		</IonPage >
	);
}

export default Projects;
