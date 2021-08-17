import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IonRow, IonCol } from "@ionic/react";
import Searchbar from '../components/SearchBar.component';
import CategoryCard from '../components/CategoryCard.component';
import PageContainer from "../components/PageContainer.component";
import { Title, SearchBarContainer } from '../components/PageComponents.styles';

function Categories() {

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(categories);

  // Fetch categories from /api/getTopics
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getTopics");
      const data = await response.json();
      setCategories(data.topics)
      setFilteredCategories(data.topics)
    }
    fetchData();
  }, [setCategories, setFilteredCategories]);

  const Search = (event) => {
    const query = event.target.value;
    setFilteredCategories(categories.filter(category => category.name.toLowerCase().includes(query.toLowerCase())));
  }

  return (
    <PageContainer>
      <Title>Categories</Title>
      <SearchBarContainer>
        <Searchbar placeholder="Search" onChange={Search} onSubmit={() => { }} />
      </SearchBarContainer>
      <IonRow>
        {
          filteredCategories.map(category =>
            <IonCol size="6" size-md="3" key={category.name}>
              <Link style={{ textDecoration: "none" }} to={`/category/${category.name}`}>
                <CategoryCard
                  name={category.name}
                />
              </Link>
            </IonCol>
          )
        }
      </IonRow>
    </PageContainer>

  );
}

export default Categories;
