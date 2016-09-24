document.getElementById("novoContato").addEventListener("click", criarContato);
document.getElementById("listaContatos").addEventListener("click", listarContatos);
document.getElementById("removerContato").addEventListener("click", removerContato);

function criarContato() {
   var nome = document.getElementById('nome');
   var telefone = document.getElementById('telefone');
   var novoContato = navigator.contacts.create({"displayName": nome.value});
   var telefones = [];
   telefones[1] = new ContactField('mobile', telefone.value, true);
   novoContato.phoneNumbers = telefones;
   novoContato.save(ok, erro);
    
   function ok() {
      alert("Contato Salvo!")
   }
  
   function erro(message) {
      alert('falha: ' + message);
   }
  
}

function listarContatos() {
   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;

   fields = ["displayName", "phoneNumbers"];
   navigator.contacts.find(fields, sucesso, falha, options);
    
   contatoDiv = document.querySelector("#contato");
   contatoDiv.innerHTML = "";
   function sucesso(contacts) {

      for (var i = 0; i < contacts.length; i++) {
         contatoDiv.innerHTML += "<b>" + contacts[i].displayName+"</b><br/>"+contacts[i].phoneNumbers[0].value+"<br/>" ;
            
               }
 
   }
  
   function falha(message) {
      alert('Falha: ' + message);
   }
  
}


function removerContato(nome){
   var nome = document.getElementById('nome');
   var options = new ContactFindOptions();
   options.filter = nome;
   options.multiple = false;
   fields = ["displayName: " nome.value];
   navigator.contacts.find(fields, buscarContatoOK, buscarContatoErro, options);

   function buscarContatoOK(contacts){
      var contact = contacts [0];
      contact.remove(removerContatoOK, removerContatoErro);
      function removeContatoOK(contact){
         alert ("Contato Excluido!");
         listarContatos();
      }
      function removeContatoErro(message){
         alert('Falha: ' + message);
      }
   }
   function buscarContatoErro(message){
      alert('Falha: ' + message);
   }
}