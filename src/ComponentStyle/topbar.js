import { styled } from '@material-ui/styles';
import { AppBar } from '@material-ui/core';
import brown from '@material-ui/core/colors/brown';


const accent = brown['800']; // #E040FB

const TopBar = styled(AppBar)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    root: {
     flexGrow: 1,
     },
    color: accent,
});

export default TopBar;