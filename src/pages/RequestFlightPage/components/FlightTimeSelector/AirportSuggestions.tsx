import { useEffect, useState } from "react";
import styles from "./FlightTimeSelector.module.css";

interface AirportSuggestionsProps {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

const AirportSuggestions = ({
  placeholder,
  value,
  setValue,
}: AirportSuggestionsProps) => {
  const [airportList, setAirportList] = useState<
    { city: string; code: string }[]
  >([]);
  const [filteredAirports, setFilteredAirports] = useState<
    { city: string; code: string }[]
  >([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch("http://localhost:2301/airports");
        const data = await response.json();
        setAirportList(data);
      } catch (error) {
        console.error("Error fetching airport data", error);
      }
    };
    fetchAirports();
  }, []);

  return (
    <div className={styles.suggestionWrapper}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.flightSelectorInput}
        value={value}
        onChange={(e) => {
          const inputValue = e.target.value;
          setValue(inputValue);

          const query = inputValue.toLowerCase();
          const filtered = airportList.filter((airport) => {
            const cityMatch = airport.city?.toLowerCase().includes(query);
            const codeMatch = airport.code?.toLowerCase().includes(query);

            return cityMatch || codeMatch;
          });

          setFilteredAirports(filtered);
          setShowDropdown(filtered.length > 0);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />

      {showDropdown && filteredAirports.length > 0 && (
        <ul className={styles.suggestionsList}>
          {filteredAirports.map((airport) => (
            <li
              key={airport.code}
              onMouseDown={() => {
                setValue(`${airport.city} (${airport.code})`);
                setShowDropdown(false);
              }}
            >
              {airport.city} ({airport.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirportSuggestions;
