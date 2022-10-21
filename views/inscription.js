export class inscription {
    html() {
        return `
        <p>inscription</p>
        <form>
            <div class="form-group">
                <label for="ProfilePic">Photo de profile</label>
                <input type="text" class="form-control" id="ProfilePic" placeholder="photo">
              </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="Nom">Nom</label>
              <input type="text" class="form-control" id="Nom" placeholder="Nom ici">
            </div>
            <div class="form-group">
                <label for="Prenom">Prenom</label>
                <input type="text" class="form-control" id="Prenom" placeholder="Prenom ici">
              </div>
              <div class="form-group">
                <label for="adresse">Adresse</label>
                <input list="completion" type="text" class="form-control" id="adresse" placeholder="adresse postale">
                <datalist id="completion"></datalist>
                </div>
            <button type="submit" class="btn btn-primary">S'inscrire</button>
          </form>
<script></script>
          `
        
    }

    autocomplete(){
        const adresseInput = document.querySelector("#adresse")
        adresseInput.addEventListener('input', (event)=>{
            // recuperer les données
           let url = event.target.value;
           fetch(`https://api-adresse.data.gouv.fr/search/?q=${url}`).then((response)=>{
               response.json().then((data)=>{
                   for (let i = 0; i < data.features.length; i++) {
                    let proposition = data.features[i].properties.label;
                    const datalist = document.querySelector('#completion');
                    const option = new Option(
                        proposition,
                        proposition
                    )
                    datalist.appendChild(option)
                    console.log(data.features[i].properties.label);                 
                  }

              });
                //inserer les données dans mon input
            
            // voir html datalist (google)
            // console.log(event.target.value);
           });
            
        })
    }
}