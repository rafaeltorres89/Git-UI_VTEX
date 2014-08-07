
// POLISHOP JavaScript
// product.js : 1.02

function AjudaPorTelefone ()
{
    $('#helpOverlay').show().click(function () { $(this).hide(); });

    $('#helpCall').click(function (event)
    {
        event.preventDefault();
        var nomeProd = $('div.options div.nome div.productName').text();
        window.open('http://apps.polishop.com.br/polishopweb/MsgCliente/Duvida?nomeProduto=' + nomeProd,'duvidas','width=400,height=370,top=50,left=50');
    });
}

$(document).ready(function()
{
    function changeFontSize ( BOTAO )
    {
        var tamanho = $("#product-content").css("font-size"),
            entrelinha = $("#product-content").css("line-height");

        tamanho = tamanho.split("px");
        tamanho = parseFloat(tamanho[0]);
        entrelinha = entrelinha.split("px");
        entrelinha = parseFloat(entrelinha[0]);

        if ( BOTAO.attr("id") === 'fontSizeUp' ) {
            if (tamanho < 17 ) {
                tamanho = tamanho + 2;
                entrelinha = entrelinha + 2;
            }
        } else {
            if (tamanho > 12 ) {
                tamanho = tamanho - 2;
                entrelinha = entrelinha - 2;
            }
        }

        $("div#product-content").css({'font-size' : tamanho + 'px'});
        $("div#product-content").css({'line-height' : entrelinha + 'px'});

        if (tamanho === 17 || tamanho === 11 ) {
            BOTAO.addClass("OFF");
        }
        if (tamanho > 11) {
            $("a#fontSizeDown").removeClass("OFF");
        }
        if (tamanho < 17) {
            $("a#fontSizeUp").removeClass("OFF");
        }
    }

    $.fn.exists = function() { return $(this).length > 0; };

    jQuery.timer = function(time,func,callback){
        var a = {timer:setTimeout(func,time),callback:null};
        if(typeof(callback) === 'function'){a.callback = callback;}
        return a;
    };

    function zerarTopicos ()
    {
        $("div#product-content div").css({'display' : 'none'});
        $("ul.tabs a").removeClass("ON");
    }

    function zerarThumbs ()
    {
        $("ul.thumbs a").removeClass();
        $("#botao360").removeClass("ON");
        $("#botaoVideo").removeClass("ON");
    }

    function selectFirstImageThumb ()
    {
        zerarThumbs();
        $("a#botaoZoom:first").addClass("ON");
        $("#botaoVideo").removeClass("ON");

        var setaPos = $("a#botaoZoom:first").offset().left,
                setaHolder = $("#produto").offset().left,
                setaCalculo = ((parseInt(setaPos, 10)) - (parseInt(setaHolder, 10))) + 30;

        $("div#setaThumbs").css({ "left" : setaCalculo + "px" });

        var PrimaImg = $("#botaoZoom:first").attr( "rel" );
        $("div#image img").attr( "src", PrimaImg );
    }

    function organizarThumbs ()
    {
        var $thumbs = $("ul.thumbs"),
                thumbsQtd = $thumbs.find("li").length,
                testeNum = 0;

        if ( thumbsQtd < 8 )
        {
            testeNum = (8 - thumbsQtd) * 40;

            if ( $("#botaoVideo").exists() && !$("#botao360").exists() )
            {
                testeNum = testeNum + 36;
                $("#botaoVideo").css({ "left" : (testeNum - 81) + "px" });
            }

            if ( $("#botao360").exists() && !$("#botaoVideo").exists() )
            {
                testeNum = testeNum + 36;
                $("#botao360").css({ "left" : (testeNum - 81) + "px" });
            }

            $thumbs.css({ "margin-left" : testeNum + "px" });

            if ( $("#botaoVideo").exists() && $("#botao360").exists() )
            {
                $("#botaoVideo").css({ left : 0 });
                $("#botao360").css({ left : '80px' });
                $thumbs.css({ "margin-left" : '160px' });
            }
        }

        if ( $thumbs.find("li a:eq(1)").length > 0 ) { $thumbs.find("li a:eq(1)").css({ left : '80px' }); }
        if ( $thumbs.find("li a:eq(2)").length > 0 ) { $thumbs.find("li a:eq(2)").css({ left : '160px' }); }
        if ( $thumbs.find("li a:eq(3)").length > 0 ) { $thumbs.find("li a:eq(3)").css({ left : '240px' }); }
        if ( $thumbs.find("li a:eq(4)").length > 0 ) { $thumbs.find("li a:eq(4)").css({ left : '320px' }); }
        if ( $thumbs.find("li a:eq(5)").length > 0 ) { $thumbs.find("li a:eq(5)").css({ left : '400px' }); }
        if ( $thumbs.find("li a:eq(6)").length > 0 ) { $thumbs.find("li a:eq(6)").css({ left : '480px' }); }
        if ( $thumbs.find("li a:eq(7)").length > 0 ) { $thumbs.find("li a:eq(7)").css({ left : '560px' }); }
    }

    var disablePayPalButton = function ()
    {
        $('.paypal-button').unbind('click').click( function (event)
        {
            event.preventDefault();
            window.alert("Selecione o modelo desejado.");
        });
    };

    var enablePayPalButton = function ($buyButton)
    {
        $('.paypal-button').unbind('click').click( function (event)
        {
            var sPageURL = $buyButton.attr('href'),
                sURLVariables = [],
                sParameterName = [],
                payPalUrl = '',
                sPageSource = '//apps.polishop.com.br';

            if (document.location.href.match('polishop.vc'))
            {
                sPageSource = '//apps.polishop.vc';
            }

            if ( sPageURL.indexOf('&') === -1 )
            {
                sURLVariables = sPageURL.split('?');
                sParameterName = sURLVariables[1].split('=');

                if (sParameterName[0].toLowerCase() === 'idsku')
                {
                    payPalUrl = sPageSource + '/polishopweb/paypalexpresscheckout/set/?idsku=' + sParameterName[1];
                }
            }
                else
            {
                sURLVariables = sPageURL.split('&');

                for (var i = 0; i < sURLVariables.length; i++)
                {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0].toLowerCase() === 'idsku')
                    {
                        payPalUrl = sPageSource + '/polishopweb/paypalexpresscheckout/set/?idsku=' + sParameterName[1];
                    }
                }
            }

            event.preventDefault();

            $('<div class="sa_payPal_overlay" style="visibility:visible;position:fixed; width:100%; height:100%; background: rgba(0,0,0,0.65); top:0; left:0; z-index: 999999999;"><div style=" background: #FFF; background-image: linear-gradient(top, #FFFFFF 45%, #E9ECEF 80%);background-image: -o-linear-gradient(top, #FFFFFF 45%, #E9ECEF 80%);background-image: -moz-linear-gradient(top, #FFFFFF 45%, #E9ECEF 80%);background-image: -webkit-linear-gradient(top, #FFFFFF 45%, #E9ECEF 80%);background-image: -ms-linear-gradient(top, #FFFFFF 45%, #E9ECEF 80%);background-image: -webkit-gradient(linear, left top,left bottom,color-stop(0.45, #FFFFFF),color-stop(0.8, #E9ECEF));display: block;margin: auto;position: fixed; margin-left:-220px; left:50%;top: 40%;text-align: center;color: #2F6395;font-family: Arial;padding: 15px;font-size: 15px;font-weight: bold;width: 530px;-webkit-box-shadow: 3px 2px 13px rgba(50, 50, 49, 0.25);box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 5px;border: 1px solid #CFCFCF;border-radius: 6px;"><img style="display:block;margin:0 auto 10px" src="https://www.paypalobjects.com/en_US/i/icon/icon_animated_prog_dkgy_42wx42h.gif"><h2>Aguarde alguns segundos.</h2> <p style="font-size:13px; color: #003171; font-weight:400">Você está sendo redirecionado para um ambiente seguro para finalizar seu pagamento.</p><div style="margin:30px auto 0;"><img src="http://apps.hostkong.com/paypal_logo.png"/></div></div></div>').appendTo('body');

            setTimeout( function() { window.location.href = payPalUrl; }, 2000);

        });
    };

    var refreshPayPalButton = function ()
    {
        var $buyButton = $('a.buy-button');

        if ($buyButton.is(':visible'))
        {
            $('span.buy-or, a.paypal-button, .paypal-help').show();

            if ( $buyButton.attr('href').indexOf('alert') === -1 )
            {
                enablePayPalButton($buyButton);
            }
                else
            {
                disablePayPalButton();
            }
        }
            else
        {
            $('span.buy-or, a.paypal-button, .paypal-help').hide();
        }
    };

    var initPayPalButton = function ()
    {
        var $buyButton = $('.buy-button');

        $('<div style="display:block; text-align: right; padding: 5px 40px 20px 0; font-size: 11px;"><a class="paypal-help-link" href="#" title="Como Comprar" style="color: #999;">Como Comprar</a></div>').insertAfter($buyButton);
        $('<a class="paypal-button" href="#" title="Compre com PayPal" style="margin-bottom: 0;">Compre com PayPal</a>').insertAfter($buyButton);
        $('<span class="buy-or">ou</span>').insertAfter($buyButton);
        $('.paypal-help-link').click(function (event)
        {
            event.preventDefault();
            $('body').append('<div class="paypal-help-window" style="top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.5); position: fixed; z-index: 999999999;"><img src="/arquivos/paypal_tutorial-1.png" style="position: absolute; top: 50%; left: 50%; margin: -278px 0 0 -511px;" /><a class="paypal-close-help" href="#" style="position: absolute; top: 50%; left: 50%; margin: -303px 0 0 488px;"><img src="/arquivos/objection_close_btn.png" /></a></div>');
            $('.paypal-close-help').click(function (event) { event.preventDefault();$('.paypal-help-window').remove(); });
        });
    };

    if ($("body").hasClass("sku") && !$("body").hasClass("servico"))
    {
        var changedLists = 0;

        var PrimaImg = $("#botaoZoom:first").attr( "rel" );
        $("div#image img").attr( "src", PrimaImg );

        //$.browser.msie - $.browser.mozilla - $.browser.safari - $.browser.chrome

        if ( $.browser.msie )
        {
            $("#info .top .tabs p:first").remove();
            $("#vejatambem").insertAfter("#info");
            $("#meuhistorico").insertAfter("#vejatambem");

            if ( $("h4.VideoProduto").exists() )
            {
                $("ul.thumbs li").css({'margin-top':'-5px'});
            }
        }

        var  is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

        if ( $.browser.safari || is_chrome )
        {
            $("a#Tags").css({ "margin" : "0 0 0 0", "border" : "none" });
            $("a#Tags").parent().css({ "border" : "none" });
        }

        $(".colecaoVT h2:first").remove();
        $(".colecaoVT ul li:even").remove();
        $(".colecaoVT ul li p.departamento").remove();
        $(".colecaoVT ul li").each( function ()
        {
            $(this).find("div.rating-produto").prependTo($(this).find("p.preco"));
            $(this).find("h2").prependTo($(this).find("p.preco"));
            $(this).find("h3").prependTo($(this).find("p.preco"));
        });

        $(".colecaoVT").easySlider({
            auto: true,
            speed: 400,
            pause: 7000,
            controlsBefore: '<p id="controls">',
            controlsAfter:  '</p>',
            continuous: true
        });

        $(document).change( function ()
        {
            organizarThumbs();
        });

        $("h4.Itens-Inclusos").appendTo("div.Itens");
        $("th.Itens-Inclusos").parent().parent().parent().appendTo("div.Itens");
        $(".sku #produto #info .Tags #tags p:first").css({ "margin-bottom" : "12px" });
        $(".sku #produto #info .Tags #tags").find("[title=Topo]").remove();

        $(".sku #produto #info .Tecnicos table th").append(":");
        $("h4.Dados-Tecnicos").next("table").find("th:last").css({ "border-bottom" : "none" });
        $("h4.Dados-Tecnicos").next("table").find("td:last").css({ "border-bottom" : "none" });

        $(".sku #produto #info .Itens table th").append(":");
        $(".sku #produto #info .Itens table th:last").css({ "border-bottom" : "none" });
        $(".sku #produto #info .Itens table td:last").css({ "border-bottom" : "none" });

        $("div.brandName").appendTo("#image");
        $("div.categoryName").appendTo("div#letreiro h2");

        $(".sku #lnkPubliqueResenha").remove();
        $(".sku .ver-todos-comentarios span a.thickbox").remove();

        //$("#calculoFrete").appendTo("body");

        // 360 Reel

        if( $("h4.Visao360Produto").length > 0 )
        {
            var reelfile = $("td.Visao360Produto").text();

            $("ul.thumbs").parent().append('<a id="botao360" href="#" title="Visão 360" rel="' + reelfile + '" onClick="_gaq.push([\'_trackEvent\', \'Visão em 360\', \'Exibição\', \'' + $('div.productName').text() + '\']);">Visão em 360&deg;</a>');
            $("ul.thumbs").css({ "margin" : "10px 0 40px 0" });
            $("h4.Visao360Produto").remove();
            $("th.Visao360Produto").parent().parent().remove();
        }

        // Video

        if( $("h4.VideoProduto").length > 0 )
        {
            var youtubecode = $("th.VideoProduto").parent().find('td.value-field').text();

            $("ul.thumbs").parent().append('<a id="botaoVideo" href="#" title="V&iacute;deo" rel="' + youtubecode + '" onClick="_gaq.push([\'_trackEvent\', \'Vídeo\', \'Exibição\', \'' + $('div.productName').text() + '\']);">V&iacute;deo</a>');
            $("ul.thumbs").css({ "margin" : "10px 0 40px 0" });
            $("h4.VideoProduto").remove();
            $("th.VideoProduto").parent().parent().remove();
        }

        $(".see-other-payment-method-link").text("(veja mais)");
        $(".other-payment-method span").addClass("texto");
        $(".see-other-payment-method-link").insertBefore(".other-payment-method select");
        $(".other-payment-method").prepend("<span class='bullet'></span>");
        $("#CalculoDeFrete").prepend("<span class='bullet'></span>");

        if ($("#produto #info .Tags #tags a:last").attr("class") === "")
        {
            $("<span class='bullet'></span>").insertBefore("#produto #info .Tags #tags a:last");
            //$("#produto #info .Tags #tags a:last").css({"color" : "inherit", "font-weight" : "bold", "margin-top" : "20px"});
        }
        $("div.Tags").insertAfter("div.Opiniao");
        $("div.avalie-produto h5").html("Avalie este produto");

        $("ul.thumbs a").click( function ()
        {
            zerarThumbs();
            var ID = $(this).attr("id");
            var pos = $(this).offset();
            var holder = $("#produto").offset();
            $(this).addClass("ON");
            $("div#setaThumbs").css({'left' : (pos.left - holder.left + 30) + 'px'});

            if (ID !== "botaoVideo" || ID !== "botao360" || ID !== "botaoExplore")
            {
                if ( $("#videoHolder").exists() )
                {
                    $("#videoHolder").empty().remove();
                    $("#show #include #special").css({'display' : 'none'});
                }

                if ( $('#reel-image').exists() )
                {
                    $('#reel-image').trigger('stop');
                    $("#show #include #reelHolder").css({'display' : 'none'});
                }

                var marca = $("div.brandName").css("display");
                var isto = $(this).attr("rel");
                var primeiroThumb = $("#botaoZoom:first").attr("rel");

                if ( ID === "botaoZoom" && isto === primeiroThumb  )
                {
                    if ( marca === "none" ) { $("div.brandName").css({ "display" : "block" }); }
                }
                    else
                {
                    if ( marca !== "none" ) { $("div.brandName").css({ "display" : "none" }); }
                }

                $("div#setaThumbs").animate({ 'top': '510px' }, 300 );
                $("#show #include").animate({ 'height': '500px' }, 300 );
                $("#show #botao360").animate({ 'top': '517px' }, 300 );
                $("#show #botaoVideo").animate({ 'top': '517px' }, 300 );

                $('#show #include #image').css({ 'display' : 'block' });
                var picRel = $(this).attr('rel');
                var picAlt = $('#show #include #image img').attr('alt');
                $('#show #include #image img').replaceWith('<img src="' + picRel + '" alt="' + picAlt + '" style="opacity: 0;">');
                $('#show #include #image img').animate({ 'opacity': '1' }, 300 );
            }
        });

        $("#botao360").live( 'click', function (event)
        {
            event.preventDefault();
            zerarThumbs();
            var pos = $(this).offset();
            var holder = $("#produto").offset();
            $(this).addClass("ON");
            $("div#setaThumbs").css({'left' : (pos.left - holder.left + 30) + 'px'});

            $("#show #include #image").css({'display' : 'none'});

            if ( $("#videoHolder").exists() )
            {
                $("#videoHolder").empty().remove();
                $("#show #include #special").css({'display' : 'none'});
            }

            $('div#setaThumbs').animate({ 'top': '510px' }, 300 );
            $('#show #include').animate({ 'height': '500px' }, 300 );
            $("#show #botao360").animate({ 'top' : '517px' }, 300);
            $("#show #botaoVideo").animate({ 'top' : '517px' }, 300);

            if ( $('#reel-image').exists() )
            {
                $("#show #include #reelHolder").css({'display' : 'block'});
                $('#reel-image').trigger('play');
            }
                else
            {
                if ( $(this).attr('rel').search('360S') !== -1)
                {
                    $('#show #include').append('<div id="reelHolder" class="reel-overlay"><img src="http://www.polishop.com.br/Control/ArquivoExibir.aspx?NomeArquivo=' + $(this).attr('rel') + '" id="reel-image" class="reel" height="500" width="650" /></div>');

                    var imageSrc = $(this).attr('rel'),
                            imageInit = imageSrc.indexOf('360S_R') + 6,
                            imageEnd  = imageSrc.indexOf('_', imageInit),
                            imageJpg  = imageSrc.indexOf('.jpg'),
                            imageNum = parseFloat(imageSrc.substring(imageInit, imageEnd)),
                            imagePre = imageSrc.substring(0, imageInit),
                            imageSuf = imageSrc.substring(imageEnd, imageJpg),
                            imageArray = [];

                    for (var i = 1; i <= imageNum; i++)
                    {
                        var thisNum = '';

                        if (i < 10)
                        {
                            thisNum = '00' + i;
                        }
                            else if (i < 100)
                        {
                            thisNum = '0' + i;
                        }
                            else
                        {
                            thisNum = i;
                        }

                        imageArray.push(imagePre + thisNum + imageSuf + '-reel.jpg');
                    }

                    $('#reel-image').reel({ speed: 0.15, images: imageArray, path: 'http://www.polishop.com.br/Control/ArquivoExibir.aspx?NomeArquivo=' });
                }
                    else
                {
                    $('#show #include').append('<div id="reelHolder" class="reel-overlay"><img src="http://www.polishop.com.br/Control/ArquivoExibir.aspx?NomeArquivo=' + $(this).attr('rel') + '" id="reel-image" class="reel" height="500" width="650" /></div>');
                    $('#reel-image').reel({ frames: 30, speed: 0.4, footage: 30 });
                }
            }
        });

        $("#botaoVideo").live( 'click', function (event)
        {
            event.preventDefault();
            zerarThumbs();
            var pos = $(this).offset();
            var holder = $("#produto").offset();
            $(this).addClass("ON");
            $("div#setaThumbs").css({'left' : (pos.left - holder.left + 30) + 'px'});

            $("#show #include #image").css({'display' : 'none'});

            if ( $('#reel-image').exists() )
            {
                $('#reel-image').trigger('stop');
                $("#show #include #reelHolder").css({'display' : 'none'});
            }

            $('#show #include').append('<div id="videoHolder" style="display: block; height: 406px; width: 650px;"><div id="videoInclude"></div></div>');
            $('div#setaThumbs').animate({ 'top': '417px' }, 300 );
            $('#show #include').animate({ 'height': '406px' }, 300 );
            $("#show #botao360").animate({ 'top' : '423px' }, 300);
            $("#show #botaoVideo").animate({ 'top' : '423px' }, 300);

            var flashvars = {};
            flashvars.ID = $(this).attr('rel');
            var params = { menu: 'false', allowScriptAccess: 'always', wmode: 'transparent', allowFullScreen: 'true', scale: 'noscale' };
            var attributes = { id: 'youtubeplayer' };

            swfobject.embedSWF('/Control/ArquivoExibir.aspx?NomeArquivo=produtoVideoPlayer.swf', 'videoInclude', '650', '406', '9.0.0', '/Control/ArquivoExibir.aspx?NomeArquivo=expressinstall.swf', flashvars, params, attributes);

            SWFID = 'youtubeplayer';
        });

        if ( $('#divCompreJunto').children().size() === 0 )
        {
            $('#crossupsell').remove();
        }

        $("#compartilhe").appendTo("div.Descricao");

        $("ul.tabs a").click( function ()
        {
            zerarTopicos();
            var ID = $(this).attr("id");
            $(this).addClass("ON");
            $("#product-content div").css({'display' : 'none'});

            if (ID !== "Tags") { $("#compartilhe").appendTo("div." + ID); }

            $("div." + ID).css({'display' : 'block'});
            $("div." + ID + " div").css({'display' : 'block'});
            $("div." + ID).css({'opacity' : '0'});
            $("div." + ID).animate({ opacity: 1 }, 500 );

            if (ID === "Descricao") {
                $("div#setaAbas").css({'margin' : '-1px 0 0 40px'});
            } else if (ID === "Tecnicos") {
                $("div#setaAbas").css({'margin' : '-1px 0 0 144px'});
            } else if (ID === "Itens") {
                $("div#setaAbas").css({'margin' : '-1px 0 0 257px'});
            } else if (ID === "Opiniao") {
                $("div#setaAbas").css({'margin' : '-1px 0 0 382px'});
            } else if (ID === "Tags") {
                $("div#setaAbas").css({'margin' : '-1px 0 0 484px'});
            }
        });

        $("a#fontSizeUp").click(function () {
            changeFontSize( $(this) );
        });

        $("a#fontSizeDown").click(function () {
            changeFontSize( $(this) );
        });

        $("ul.tabs a#Opiniao").click( function ()
        {
            $("fieldset#opcoes-avalie label:eq(0)").css({ "background-position" : "-10px -618px" });
            $("fieldset#opcoes-avalie label:eq(1)").css({ "background-position" : "-10px -649px", "width" : "206px" });
            $("fieldset#opcoes-avalie label:eq(2)").css({ "background-position" : "-10px -680px", "width" : "226px" });
        });

        $("fieldset#opcoes-avalie").find("label:eq(0)").css({ "background-position" : "-10px -618px" });

        $("fieldset#opcoes-avalie").find("label:eq(1)").css({ "background-position" : "-10px -649px", "width" : "206px" });

        $("fieldset#opcoes-avalie").find("label:eq(2)").css({ "background-position" : "-10px -680px", "width" : "226px" });

        $("div.topico").each( function ()
        {
            if ( $(this).html() === "" )
            {
                $(this).remove();
            }
        });

        organizarThumbs();

        var myTimer = {};
        myTimer = $.timer( 10,function() { organizarThumbs(); selectFirstImageThumb(); });

        $("<div class='botaoParcelamento'></div>").insertBefore(".other-payment-method-ul");
        $(".other-payment-method-ul li:first").clone().appendTo(".botaoParcelamento");
        $(".botaoParcelamento").append("<a href='javascript:void(0);'><font>VEJA</font><b>+</b></a> ");
        var tamanhoParcelamento = $(".other-payment-method-ul").height();
        $(".other-payment-method-ul").css({ "height" : "0" });
        $(".other-payment-method-ul li:first").remove();

        $(".botaoParcelamento").click( function ()
        {

            if ( $(".other-payment-method-ul").css("display") !== "block" )
            {
                $(".other-payment-method-ul").css({ "display" : "block" });
                $(".other-payment-method-ul").css({ "height" : "0" });
                $(".other-payment-method-ul").animate({ "height" : tamanhoParcelamento + "px" },"fast");
                $(this).find("a").find("b").text("-");
            }
                else
            {
                $(".other-payment-method-ul").css({ "display" : "none" });
                $(this).find("a").find("b").text("+");
            }
        });

        if ( $(".garantia-extendida").length > 0 )
        {
            $("#header #login").remove();
            $("div.insert h2").html("SERVI&Ccedil;OS");
            $(".garantia-extendida input.fisubmit:first").remove();
            $(".garantia-extendida .wrapper").prepend("<div class='title'><h1 class='title'>Garantia Estendida</h1><span></span></div>");
            $(".garantia-extendida .wrapper h2:first").prependTo(".box-info");
            $(".garantia-extendida fieldset.continuar").appendTo(".box-info");
            $(".box-garantia-extendida h3").appendTo(".garantia-extendida .wrapper div.title span");
            $(".box-garantia-extendida a.more").appendTo(".garantia-extendida .wrapper div.title span");
            $(".box-image img").css({ "height" : "250px" });
            $("#busca .botao").css({ "float" : "right", "border" : "none", "margin-top" : "-19px" });
            $("#busca .campoBusca").css({ "display" : "inline-block", "float" : "left", "width" : "270px", "margin-top" : "-15px", "background" : "transparent" });
        }

        initPayPalButton();

        $(document).ajaxComplete( function ()
        {
            refreshPayPalButton();
        });

        $(".sku-selector").change( function () { organizarThumbs(); });

        $("document").load( function () { organizarThumbs(); });

        $("div#image img").attr( "src", PrimaImg );

        //$('.giftlistinsertsku').insertAfter('.add_list h6');
        //$('.giftlistinsertsku-message').insertAfter('.add_list .giftlistinsertsku');

        $('a#buttonAddToStore').click( function (event)
        {
            event.preventDefault();

            var left = $(this).offset().left - 20,
                    top = $(this).offset().top - 20;

            $('div#add_store').show().css({ 'opacity' : '0' }).animate({ 'opacity' : '1' }, 500);
            $('div#add_store').css({ 'left' : left + 'px', 'top' : top + 'px' });
            if (changedLists !== 1)
            {
                $('li.Lista-de-Casamento a').each( function ()
                {
                    $(this).text($(this).text().substr(18));
                });
            }
            changedLists = 1;
        });

        $('a#buttonAddToList').click( function (event)
        {
            event.preventDefault();
            var left = $(this).offset().left - 20,
                    top = $(this).offset().top - 20;

            $('div.add_list').show().css({ 'opacity' : '0' }).animate({ 'opacity' : '1' }, 500);
            $('div.add_list').css({ 'left' : left + 'px', 'top' : top + 'px' });
            if (changedLists !== 1)
            {
                $('li.Lista-de-Casamento a').each( function ()
                {
                    $(this).text($(this).text().substr(18));
                });
            }
            changedLists = 1;
        });

        $('a#closeListWindow').click( function (event)
        {
            event.preventDefault();
            $('div.add_list').hide();
        });

        if ( $('ul.Voltagem').find('select').exists() ) { $('ul.Voltagem').parent().show(); } else { $('ul.Voltagem').parent().hide(); }
        if ( $('ul.Selecione').find('select').exists() ) { $('ul.Selecione').parent().show(); } else { $('ul.Selecione').parent().hide(); }

    }
});
