$(function () {

    BuscarStatusIntegracaoLeads();
    BuscarStatusPendentesIntegracao();
   
});

function CarregarAbaIntegracaoLeads() {    
    BuscarListaPendentesIntegracaoLeads();
}

function BuscarListaPendentesIntegracaoLeads() {

    $("#areaListaPendentesIntegracao .tabela-pendentes-integracao-lead tbody").html("Buscando...");

    AjaxRequest.GET("{0}/ObterListaPendentesIntegracaoLeads".format(url_suporte_controller), null,
        function (response) {
            if (response.sucesso) {

                var html = "";
                var i = 1;

                response.data.forEach(function (arquivo, index) {

                    html += "<tr>";
                    html += "   <td >" + i + "</td>";
                    html += "   <td>" + arquivo.DataArquivo + "</td>";
                    html += "   <td>" + arquivo.NomeArquivo + "</td>";
                    html += "   <td>";
                    html += "       <div class='btn btn-primary' onclick='VisualizarArquivoPendentesIntegracao(" + arquivo.ConteudoArquivo + ")'>Ver Arquivo</div>";
                    html += "       <div class='btn btn-primary' onclick=DeletarArquivoIntegracao('" + arquivo.NomeArquivo + "')>Deletar</div>";
                    html += "   </td>";
                    html += "</tr>";

                    i++;
                });

                $("#areaListaPendentesIntegracao .tabela-pendente-integracao-lead tbody").html(html);
            }
        },
        function () { BloquearElemento($("#areaListaPendentesIntegracao"), 'Buscando informações...', 'pulse'); },
        function () { DesbloquearElemento($("#areaListaPendentesIntegracao")) });

// ver arquivo

 function VisualizarArquivoPendentesIntegracao(conteudo) {

    $("#conteudoArquivoPendentesIntegracao").parent().show();
    $("#conteudoArquivoPendentesIntegracaoEdicao").parent().hide();

    $('#mdDetalheArquivoPendentesIntegracao').modal('show');
    $("#conteudoArquivoPendentesIntegracao").text(JSON.stringify(conteudo, null, '\t'));
}
// deletar arquivo

function DeletarArquivoIntegracao(nomeArquivoPendente) {

    AjaxRequest.POST("{0}/DeletarArquivoIntegracaoLead?nomeArquivoPendente={1}".format(url_suporte_controller, nomeArquivoPendente), null,
        function (response) {
            if (response.sucesso) {

                ExibirNotificacaoSucesso("Arquivo deletado!;");
                BuscarListaPendentesIntegracaoLeads();
                BuscarStatusIntegracaoLeads();
            }
        },
        function () { BloquearElemento($("#areaListasPendentesIntegracao"), 'Deletando arquivo...', 'pulse'); },
        function () { DesbloquearElemento($("#areaListaPendentesIntegracao")) });

    }
}