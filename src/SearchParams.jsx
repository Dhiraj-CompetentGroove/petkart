import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];


const SearchParams = () => {


  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];


  return (
    <div className="search-params">
      <form
      onSubmit={(e) => {
                   e.preventDefault();
                   const formData = new FormData(e.target);
                   const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? "",
                  };
                  setRequestParams(obj);
                  
                 }}
      >
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="Breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );

};

export default SearchParams;


// import { useState, useEffect } from "react";

// //import Pet from "./Pet";
// import Results from "./Results";
// import useBreedList from "./useBreedList";

// const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

// const SearchParams = () => {
//   const [location, updateLocation] = useState("Ranchi");
//   const [animal, updateAnimal] = useState("");
//   const [breed, setBreed] = useState("");
//   const [breeds] = useBreedList(animal);
//   //const breeds =[];
//   const [pets, setPets] = useState([]);

//   useEffect(() => {
//     requestPets();
//   }, []);

//   async function requestPets() {
//     const res = await fetch(
//       `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
//     );
//     const json = await res.json();

//     setPets(json.pets);
//   }

//   return (
//     <div className="search-params">
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           requestPets();
//         }}
//       >
//         <label htmlFor="location">
//           Location
//           <input
//             id="location"
//             value={location}
//             placeholder="Location"
//             onChange={(e) => updateLocation(e.target.value)}
//           />
//         </label>

//         <label htmlFor="animal">
//           Animal
//           <select
//             id="animal"
//             value={animal}
//             onChange={(e) => {
//               updateAnimal(e.target.value);
//               setBreed("");
//             }}
//             onBlur={(e) => {
//               updateAnimal(e.target.value);
//               setBreed("");
//             }}
//           >
//             <option />
//             {ANIMALS.map((animal) => (
//               <option key={animal} value={animal}>
//                 {animal}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label htmlFor="breed">
//           Breed
//           <select
//             disabled={!breeds.length}
//             id="breed"
//             value={breed}
//             onChange={(e) => setBreed(e.target.value)}
//             onBlur={(e) => setBreed(e.target.value)}
//           >
//             <option />
//             {breeds.map((breed) => (
//               <option key={breed} value={breed}>
//                 {breed}
//               </option>
//             ))}
//           </select>
//         </label>

//         <button>Submit</button>
//       </form>
//       <Results pets={pets} />;
//       {/* {
//   pets.map((pet) => (
//     <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} />
//   ))
// } */}
//     </div>
//   );
// };

// export default SearchParams;
