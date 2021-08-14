import { useState, useEffect } from "react";
import { IonRow } from "@ionic/react";
import Searchbar from '../components/Searchbar.component';
import ProjectCard from '../components/ProjectCard.component';
import NotFound from '../components/NotFound.component';
import { useProjects } from "../utils/hooks/useProject";
import { SearchBarContainer, Title } from '../components/PageComponentStyles'
import PageContainer from "../components/PageContainer";
import { Link } from "react-router-dom";

function Category(props) {

  const [state, changeUrl] = useProjects();
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const categoryName = props.match.params.id;

  // Fetch categories from /api/getTopics
  useEffect(() => {
    if (searchQuery) {
      changeUrl(`?searchterm=${searchQuery}&topic=${categoryName}`);
    } else {
      changeUrl(`?topic=${categoryName}`);
    }
  }, [categoryName, searchQuery, changeUrl]);

  // const onChange = (event) => {
  //   const query = event.target.value;
  //   setSearchQuery(query);
  // }
  const onChange = (event) => {
    const query = event.target.value;
    setSearchText(query)
  }
  const Search = (event) => {
    event.preventDefault();
    setSearchQuery(searchText)
  }

  return (
    <PageContainer>
      <Title>
        <Link to="/categories" style={{ color: "black" }}>
          Categories
        </Link>
        &nbsp;&gt;&nbsp;
        {categoryName}
      </Title>
      <SearchBarContainer>
        <Searchbar placeholder="Search" onChange={onChange} onSubmit={Search} />
      </SearchBarContainer>
      {
        state.data?.projects?.length &&
        <IonRow>
          {
            state.data.projects.map((project) => {
              const { id, title, description, date, url, owner } = project;
              return (
                <ProjectCard
                  title={title}
                  description={description}
                  date={date}
                  url={url}
                  owner={owner}
                  id={id}
                  key={id}
                  languages={state.lang[id]}
                  topics={state.top[id]}
                  collabs={state.us[id]}
                />
              );
            })
          }
        </IonRow>
      }
      {
        !state.data?.projects?.length &&
        <NotFound message="There are no projects under this category." />
      }
    </PageContainer>
  );
}

export default Category;
