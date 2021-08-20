import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IonRow } from "@ionic/react";
import ProjectCard from "../components/ProjectCard.component";
import CategoryButton from "../components/CategoryButton.component";
import Searchbar from '../components/SearchBar.component';
import NotFound from '../components/NotFound.component';
import GlobalContext from "../utils/state/GlobalContext";
import { useJwt } from "react-jwt";
import { Title, Separator } from "../components/PageComponents.styles";
import PageContainer from '../components/PageContainer.component'

function Home() {
  const [search, setSearch] = useState('');
  const [projectList, setProjectList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projectList);
  const [tops, setTops] = useState(new Map())
  const [langs, setLangs] = useState(new Map())
  const [users, setUsers] = useState(new Map())

  const { state } = useContext(GlobalContext);

  var decodedToken;
  decodedToken = useJwt(state.token);

  useEffect(() => {
    fetch('/api/getProjects').then(res => res.json()).then(async data => {
      setProjectList(data.projects)

      var langdict = new Map();
      var topdict = new Map();
      var userdict = new Map();

      for (var proj in data.projects) {
        let id;
        id = data.projects[proj].id;
        await Promise.all([
          fetch('/api/getProjectLanguages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "projectId": id })
          }),
          fetch('/api/getProjectTopics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "projectId": id })
          }),
          fetch('/api/getUsersInProject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "projectId": id })
          })
        ]).then(responses =>
          Promise.all(responses.map(response => response.json()))
        ).then(data => {
          const languages = []
          for (var lang in data[0].languages) {
            languages.push(data[0].languages[lang].language)
          }
          langdict.set(id, languages)

          const topics = []
          for (var top in data[1].topics) {
            topics.push(data[1].topics[top].topic)
          }
          topdict.set(id, topics)

          const users = []
          for (var us in data[2].users) {
            users.push(data[2].users[us].username)
          }
          userdict.set(id, users)

        })
      }

      setTops(topdict)
      setLangs(langdict)
      setUsers(userdict)

    }).catch(e => console.log(e))
  }, [])


  useEffect(() => {
    var filteredProjects = projectList
    if (decodedToken?.decodedToken?.username) {
      filteredProjects = filteredProjects.filter((p) => {
        return (p.owner !== decodedToken.decodedToken.username);
      });

    }
    if (search) {
      filteredProjects = filteredProjects.filter((p) => {
        return (p.title.toLowerCase().includes(search.toLowerCase()));
      });

    }
    setFilteredProjects(filteredProjects);

  }, [search, projectList]);



  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getTopics");
      const data = await response.json();
      setCategories(data.topics)
    }
    fetchData().catch((e) => console.log(e));
  }, []);

  return (

    <PageContainer>
      {/* Search Bar */}
      <section>
        <Searchbar
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Categories */}
      <section>
        <Title data-testid="cat">Explore by Category</Title>
        {categories.slice(0, 4).map((category) => (
          <Link to={`/category/${category.name}`} >
            <CategoryButton key={category.name}>
              {category.name}
            </CategoryButton>
          </Link>
        ))}
      </section>

      <Separator />

      {/* Projects */}
      <section>
        <Title>{search ? "Search Results" : "Recommended for You"}</Title>
        <IonRow data-testid="projects">
          {filteredProjects.map((project) => {
            const { id, title, description, date, url, owner } = project;

            return (
              <ProjectCard
                title={title}
                description={description}
                date={date}
                url={url}
                owner={owner}
                id={id}
                languages={langs.get(id)}
                topics={tops.get(id)}
                collabs={users.get(id)}
                showContactButton={true}
              />
            );
          })}

        </IonRow>
        {!filteredProjects.length && <NotFound title="No match" />}
      </section>
    </PageContainer>

  );
}

export default Home;
