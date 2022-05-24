import { BiSort } from 'react-icons/bi';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from 'app/features';

const sortByControls = [
  {
    id: 1,
    sortBy: 'LATEST',
    label: 'Latest',
  },
  {
    id: 2,
    sortBy: 'TRENDING',
    label: 'Trending',
  },
  {
    id: 3,
    sortBy: 'OLDEST',
    label: 'Oldest',
  },
];

export const SortPosts = () => {
  const dispatch = useDispatch();
  const { sortBy: filter } = useSelector((store) => store.posts);

  const sortByHandler = (sortBy) => {
    dispatch(setSortBy({ sortBy }));
  };

  return (
    <Menu>
      <MenuButton
        display='inline-block'
        mb={8}
        as={Button}
        leftIcon={<BiSort />}
      >
        Sort By - {filter}
      </MenuButton>
      <MenuList>
        {sortByControls.map(({ id, sortBy, label }) => {
          return (
            <MenuItem key={id} onClick={() => sortByHandler(sortBy)}>
              {label}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
