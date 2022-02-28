import { useEffect, useState } from 'react';
import {BeerMetaData} from "./data/beer.data";

function App() {
  const [items, setItems] = useState({});

  useEffect(() => {
    const request = () =>
        BeerMetaData.forEach((product) => {
        fetch(`http://localhost:8081/temperature/${product.id}`)
          .then((response) => response.json())
          .then((response) =>
            setItems((prevItems) => ({
              ...prevItems,
              [product.id]: {
                ...product,
                ...response,
              },
            }))
          );
      });

    setInterval(request, 5000);

    request();
  }, []);

  return (
    <div className="App">
      <h2>Beers</h2>
      <table>
        <thead>
          <tr>
            <th align="left">Product</th>
            <th align="left">Temperature</th>
            <th align="left">Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(items).map((itemKey) => (
            <tr key={items[itemKey].id}>
              <td width={150}>{items[itemKey].name}</td>
              <td width={150}>{items[itemKey].temperature}</td>
              <td width={150}>
                <TemperatureState current={items[itemKey].temperature}
                                  minimum={items[itemKey].minimumTemperature}
                                  maximum={items[itemKey].maximumTemperature}
                                  />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const TemperatureState = ({current, minimum, maximum}) => {
  let state;
  if (current < minimum) {
    state = "too low";
  } else if (current > maximum) {
    state = "too high";
  } else if (current <= maximum && current >= minimum) {
    state = "all good";
  }
  return <span >{state}</span>;
}

export default App;
