import React from "react";
import {Modal,FormLabel,FormGroup,FormControl,Button} from 'react-bootstrap';
import ReactDOM from 'react-dom';


class AddRecette extends React.Component {

  constructor(props) {
    super(props);
    this.state = {nomRecette: "", ingredients: ""};
    this.handleNomRecetteChange = this.handleNomRecetteChange.bind(this);
    this.handleIngredientsRecetteChange = this.handleIngredientsRecetteChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAnnuler = this.handleAnnuler.bind(this);
  }

  handleNomRecetteChange(e) {
    this.setState({nomRecette: e.target.value});
  }

  handleIngredientsRecetteChange(e) {
    this.setState({ingredients: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const onAdd = this.props.onAdd;
    var nouveauNomRecette = this.state.nomRecette;
    var nouveauxIngredients = this.state.ingredients.split(",");
    var newRecipe = {nomRecette: nouveauNomRecette, ingredients: nouveauxIngredients};
    onAdd(newRecipe);
    this.setState({nomRecette: "", ingredients: ""});
  }

  handleAnnuler() {
    const onAddModal = this.props.onAddModal;
    this.setState({nomRecette: "", ingredients: ""});
    onAddModal();
  }


  render() {
    const onShow = this.props.onShow;

    return(
      <Modal show={onShow} onHide={this.handleAnnuler}>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle Recette</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsName">
            <FormLabel>nom recette</FormLabel>
            <FormControl type="text" required onChange={this.handleNomRecetteChange} value={this.state.nomRecette} placeholder="Entrer le nom de la recette" />
          </FormGroup>
          <FormGroup controlId="formControlsIngredients">
            <FormLabel>Ingredients</FormLabel>
            <FormControl componentClass="textarea" type="text" required onChange={this.handleIngredientsRecetteChange} value={this.state.ingredients} placeholder="Entrer Ingredients(separer par virgule ,)" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.handleSubmit}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddRecette;
