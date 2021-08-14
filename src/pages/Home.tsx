import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IonRow } from "@ionic/react";
import ProjectCard from "../components/ProjectCard.component";
import CategoryButton from "../components/CategoryButton.component";
import Searchbar from '../components/Searchbar.component';
import NotFound from '../components/NotFound.component';
import GlobalContext from "../utils/state/GlobalContext";
import { useJwt } from "react-jwt";
import { Title, Separator } from "../components/PageComponentStyles";
import PageContainer from '../components/PageContainer'

function Home() {
  const [search, setSearch] = useState('');
  const [projectList, setProjectList]: any = useState([]);
  const [categories, setCategories]: any = useState([]);
  const [filteredProjects, setFilteredProjects]: any = useState([]);
  const [tops, setTops]: any = useState(new Map<number, any[]>())
  const [langs, setLangs]: any = useState(new Map<number, any[]>())
  const [users, setUsers]: any = useState(new Map<number, any[]>())

  const { state } = useContext(GlobalContext);
  var decodedToken: any;
  decodedToken = useJwt(state.token);

  useEffect(() => {
    fetch('/api/getProjects').then(res => res.json()).then(async data => {

      // console.log(decodedToken.decodedToken.username)
      if (decodedToken?.decodedToken?.username) {
        setProjectList(data.projects.filter((p: any) => {
          return (p.owner.toLowerCase() != decodedToken.decodedToken.username);
        }));
      }
      else {
        setProjectList(data.projects)
      }

      console.log(data.projects);
      var langdict = new Map<number, any[]>();
      var topdict = new Map<number, any[]>();
      var userdict = new Map<number, any[]>();
      for (var proj in data.projects) {
        let id: number;
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

    })
  }, [])


  useEffect(() => {
    var filteredProjects = []
    if (decodedToken?.decodedToken?.username) {
      filteredProjects = projectList.filter((p: any) => {
        return (p.owner != decodedToken.decodedToken.username);
      });
      if (search) {
        filteredProjects = projectList.filter((p: any) => {
          return (p.title.toLowerCase().includes(search.toLowerCase()));
        });

      }
      setFilteredProjects(filteredProjects);
    }

  }, [search, projectList]);



  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/api/getTopics"
      );
      const data = await response.json();
      setCategories(data.topics);
    }
    fetchData();
  }, []);

  return (

    <PageContainer>
      {/* Search Bar */}
      <section>
        <Searchbar
          placeholder="Search"
          onChange={(e: any) => setSearch(e.target.value!)}
        />
      </section>

      {/* Categories */}
      <section>
        <Title>Explore by Category</Title>
        {categories.slice(0, 4).map((category: any) => (
          <Link to={`/category/${category.name}`}>
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
        <IonRow>

          {filteredProjects.map((project: any) => {
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
