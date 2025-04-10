import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { MapsService } from "../../services/maps.service";
import { SyntheticEvent, useState } from "react";
import { Commons } from "../../utils/commons.utils";
import { Search } from "@mui/icons-material";
import { FC } from "react";
import { useSkeleton } from "../../hooks/skeleton";


export interface PlaceAutocompleteProps {
    onSelect: (city: string) => void;
    defaultValue?: string;
    className?: string;
    isLoading?: boolean;
}

const PlaceAutocomplete: FC<PlaceAutocompleteProps> = ({ onSelect, defaultValue, className, isLoading }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [options, setOptions] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>(defaultValue ?? "");
    const mapsService = new MapsService();
    const ref = useSkeleton(isLoading ?? false); 

    function handleSelect(event: SyntheticEvent, value: string) {
        if (event && value) {
            setSelectedCity(value);
            onSelect(value);
        }
    }

    const handleAutocompleteSearch = Commons.debounce(
        async (event: SyntheticEvent, value: string) => {
            try {
                if (!event || !value) return;
                setIsSearching(true);
                const response = await mapsService.getSearchAddress(value);
                const newItems = response.map((item) => item.description);
                setOptions(newItems);
            } catch (error) {
                if (error) {
                    setOptions([]);
                }
            } finally {
                setIsSearching(false);
            }
        },
        500
    );

    return (
        <Autocomplete
            freeSolo
            disableClearable
            options={options}
            onInputChange={handleAutocompleteSearch}
            loading={isSearching}
            onChange={handleSelect}
            ref={ref}
            className={className}
            loadingText="Pesquisando sua cidade..."
            noOptionsText="Nenhuma cidade encontrada"
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Pesquisar cidade"
                    variant="filled"
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            type: "search",
                            value: selectedCity,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            )}
        />
    );
};

export default PlaceAutocomplete;