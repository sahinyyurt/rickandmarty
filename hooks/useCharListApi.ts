import {useQuery} from '@tanstack/react-query';
import {CharListResult, Result} from '../types/types';
import {useRef, useState} from 'react';

export function useCharListApi() {
  const page = useRef('');
  const [allData, setAllData] = useState<Result[]>([]);
  const [nextPage, setNextPage] = useState(page.current);
  const {isLoading} = useQuery<Result[]>({
    queryKey: ['charlist', nextPage],
    queryFn: async () => {
      let url = 'https://rickandmortyapi.com/api/character';
      if (page.current.length > 0) {
        console.log(nextPage);
        url = nextPage;
      }
      const res = await fetch(url);
      const json = (await res.json()) as CharListResult;
      page.current = json.info.next;
      setAllData([...allData, ...json.results]);
      return json.results;
    },
  });

  const getNextPage = () => {
    setNextPage(page.current);
  };

  return {isLoading, data: allData, getNextPage};
}
