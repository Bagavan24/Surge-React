import React,{useState, useEffect} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by the "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {" team."}
    </Typography>
  );
}



const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const initialValues = {firstName:"", lastName:"", email:"", password:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register(){
    console.warn(firstname, lastname, email, password)
  }


  const handleChange = (e) =>{
     const {name , value} = e.target;
     setFormValues({...formValues, [name]:value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.firstName){
      errors.firstName = "FirstName is required!"
    }
    if(!values.lastName){
      errors.lastName = "LastName is required!"
    }
    if(!values.email){
      errors.email = "email is required!"
    } else if(!regex.test(values.email)){
      errors.email = "This is not a valid email !"
    }
    if(!values.password){
      errors.password = "Password is required!"
    }else if(values.password.length < 4){
      errors.password = "Password must me more than 4 characters!"
    }else if(values.password.length > 10){
      errors.password = "Password cannot exceed more than 10 characters!"
    }
    return errors;
  }



  // let result = await fetch("http://127.0.0.1:8000/api/userSignup",{
  //   method:'POST',
  //   body:JSON.stringify(item),
  //   headers:{
  //     "Content-Type":'application/json',
  //     "Accept":'application/json'
  //   }
  // })
  // result = await result.json()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={formValues.firstName}
                onChange={handleChange}
              /><br/>
              <p>{formErrors.firstName}</p>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
              /><br/>
              <p>{formErrors.lastName}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              /><br/>
              <p>{formErrors.email}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
              /><br/>
              <p>{formErrors.password}</p>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={register}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
