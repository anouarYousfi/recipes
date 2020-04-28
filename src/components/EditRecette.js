import React from "react";
import {Modal,FormLabel,FormGroup,FormControl,Button} from 'react-bootstrap';
import ReactDOM from 'react-dom';

class EditRecette extends React.Component {


  constructor(props) {
    super(props);
    this.state = {nomRecette: "", ingredients: ""};
    this.handleNomRecetteChange = this.handleNomRecetteChange.bind(this);
    this.handleIngredientsRecetteChange = this.handleIngredientsRecetteChange.bind(this);
    this.handleModifier = this.handleModifier.bind(this);
    this.handleAnnuler = this.handleAnnuler.bind(this);
  }


  static getDerivedStateFromProps(props, state) {
    const nomRecettePrecedent = state.nomRecettePrecedent;
    const ingredientsPrecedent = state.ingredientsPrecedent;
    const nomRecette = nomRecettePrecedent !== props.recette.nomRecette ? props.recette.nomRecette : state.nomRecette;
    const ingredients = ingredientsPrecedent !== props.recette.ingredients.join(",") ? props.recette.ingredients.join(",") : state.ingredients;
    return {
      nomRecettePrecedent: props.recette.nomRecette, nomRecette,
      ingredientsPrecedent: props.recette.ingredients.join(","), ingredients,
    }
  }

  handleNomRecetteChange(e) {
    this.setState({nomRecette: e.target.value});
  }

  handleIngredientsRecetteChange(e) {
    this.setState({ingredients: e.target.value});
  }

  handleModifier(e) {
    e.preventDefault();
    const onEdit = this.props.onEdit;
    const currentlyEditing = this.props.currentlyEditing;
    var nomRecette = this.state.nomRecette;
    var ingredients = this.state.ingredients.split(",");
    onEdit(nomRecette, ingredients, currentlyEditing);
  }

  handleAnnuler() {
    const onEditModal = this.props.onEditModal;
    this.setState({nomRecette: this.props.recette.nomRecette, ingredients: this.props.recette.ingredients.join(",")});
    onEditModal();
  }


  render() {
    const onShow = this.props.onShow;
    return(
      <Modal show={onShow} onHide={this.handleAnnuler}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier La Recette</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsName">
            <FormLabel>Nom Recette</FormLabel>
            <FormControl type="text" required onChange={this.handleNomRecetteChange} value={this.state.name} placeholder="Entrer le nom de la recette" />
          </FormGroup>
          <FormGroup controlId="formControlsIngredients">
            <FormLabel>Ingredients</FormLabel>
            <FormControl componentClass="textarea" type="text" required onChange={this.handleIngredientsRecetteChange} value={this.state.ingredients} placeholder="Entrer les Ingredients(separer par virgule ,)" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.handleModifier}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditRecette;