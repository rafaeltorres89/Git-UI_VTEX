
// POLISHOP JavaScript
// product_specialcontent.js : 1.01

function AjudaPorTelefone ()
{
    var nomeProd = $('div.options div.nome div.productName').text();
    window.open('http://apps.polishop.com.br/polishopweb/MsgCliente/Duvida?nomeProduto=' + nomeProd,'duvidas','width=400,height=370,top=50,left=50');
    void(0);
}

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

function zerarTopicos ()
{
    $("div#product-content div").css({'display' : 'none'});
    $("ul.tabs a").removeClass("ON");
}

$.fn.exists = function() { return $(this).length > 0; };

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

        $('<div class="sa_payPal_overlay" style="visibility:visible;position:fixed; width:100%; height:100%; background: rgba(0,0,0,0.65); top:0; left:0; z-index: 999999;"><div style=" background: #FFF; background-image: linear-gradient(top, #FFFFFF 45%, #E9ECEF 80%);background-image: -o-linear-gradient(top, #FFFFFF 45%, #E9ECEF 80%);background-image: -moz-linear-gradient(top, #FFFFFF 45%, #E9ECEF 80%);background-image: -webkit-linear-gradient(top, #FFFFFF 45%, #E9ECEF 80%);background-image: -ms-linear-gradient(top, #FFFFFF 45%, #E9ECEF 80%);background-image: -webkit-gradient(linear, left top,left bottom,color-stop(0.45, #FFFFFF),color-stop(0.8, #E9ECEF));display: block;margin: auto;position: fixed; margin-left:-220px; left:50%;top: 40%;text-align: center;color: #2F6395;font-family: Arial;padding: 15px;font-size: 15px;font-weight: bold;width: 530px;-webkit-box-shadow: 3px 2px 13px rgba(50, 50, 49, 0.25);box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 5px;border: 1px solid #CFCFCF;border-radius: 6px;"><img style="display:block;margin:0 auto 10px" src="https://www.paypalobjects.com/en_US/i/icon/icon_animated_prog_dkgy_42wx42h.gif"><h2>Aguarde alguns segundos.</h2> <p style="font-size:13px; color: #003171; font-weight:400">Você está sendo redirecionado para um ambiente seguro para finalizar seu pagamento.</p><div style="margin:30px auto 0;"><img src="http://apps.hostkong.com/paypal_logo.png"/></div></div></div>').appendTo('body');

        setTimeout( function() { window.location.href = payPalUrl; }, 2000);

    });
};

var refreshPayPalButton = function ()
{
    var $buyButton = $('a.buy-button');

    if ($buyButton.is(':visible'))
    {
        $('span.buy-or, a.paypal-button').show();

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
        $('span.buy-or, a.paypal-button').hide();
    }
};

var initPayPalButton = function ()
{
    var $buyButton = $('.buy-button');

        $('<div style="display:block; text-align: right; padding: 5px 50px 20px 0; font-size: 11px;"><a class="paypal-help-link" href="#" title="Como Comprar" style="color: #999;">Como Comprar</a></div>').insertAfter($buyButton);
        $('<a class="paypal-button" href="#" title="Compre com PayPal" style="margin-bottom: 0;">Compre com PayPal</a>').insertAfter($buyButton);
        $('<span class="buy-or">ou</span>').insertAfter($buyButton);
        $('.paypal-help-link').click(function (event)
        {
            event.preventDefault();
            $('body').append('<div class="paypal-help-window" style="top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.5); position: fixed; z-index: 999999999;"><img src="/arquivos/paypal_tutorial-1.png" style="position: absolute; top: 50%; left: 50%; margin: -278px 0 0 -511px;" /><a class="paypal-close-help" href="#" style="position: absolute; top: 50%; left: 50%; margin: -303px 0 0 488px;"><img src="/arquivos/objection_close_btn.png" /></a></div>');
            $('.paypal-close-help').click(function (event) { event.preventDefault();$('.paypal-help-window').remove(); });
        });
};

$.fn.scrolled = function (waitTime, fn)
{
    var tag = "scrollTimer";
    this.scroll(function () {
        var self = $(this);
        var timer = self.data(tag);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            self.data(tag, null);
            fn();
        }, waitTime);
        self.data(tag, timer);
    });
};

// var ie = (function()
// {
//     var undef, v = 3, div = document.createElement('div');

//     while (
//         div.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->',
//         div.getElementsByTagName('i')[0]
//     );

//     return v> 4 ? v : undef;
// }());

function activateSpecialContentFullPage()
{
    var lockBuyButton = false,
        specialContentSource = $('td.Link-do-Especial').text(),
        specialContentHeight = $('td.Altura-do-Especial').text(),
        specialContentImage  = $('td.Imagem-do-Especial').text(),
        specialContentMenu  = $('td.Menu-do-Especial').length ? $.parseJSON($('td.Menu-do-Especial').text()) : '',
        specialContentGA  = $('td.Evento-do-GA').text(),
        bottomLimit,
        isScrollTrackEnabled = false,
        scrollOnStage1Completed = false,
        scrollOnStage2Completed = false,
        partialContent = Math.round(($(document).height() - ($('#info').outerHeight() + $('footer').outerHeight()))/3);

    if (window.location.href.indexOf('.vc/') !== -1 || typeof(_gaq) === 'undefined')
    {
        _gaq = [];
    }

    $('td.Link-do-Especial, td.Altura-do-Especial, td.Imagem-do-Especial, th.VideoProduto, td.Evento-do-GA, td.Menu-do-Especial').parent().remove();

    $('h4.group.Especial').remove();

    $('#special-content, #special-content > iframe').css({ 'height': specialContentHeight + 'px' });
    $('#special-content > iframe').attr('height', specialContentHeight).attr('src', specialContentSource).css({ 'margin': '0', 'width': '100%' });

    $('#special-content > iframe').load( function()
    {
        partialContent = Math.round(($(document).height() - ($('#info').outerHeight() + $('footer').outerHeight()))/3);
        isScrollTrackEnabled = true;
    });

    $('#buy-side').css({ 'height': specialContentHeight - 65 });

    // if (ie && ie < 10)
    // {
    //     $('#buy-side').css({ 'height': specialContentHeight - 182 });
    // }
    //     else
    // {
    //     $('#buy-side').css({ 'height': specialContentHeight - 65 });
    // }

    $('#buy-side .options').prepend('<img src="' + specialContentImage + '" style="margin-top: -110px; margin-bottom: 10px;" />');

    $('.scroll2top').click( function (event) { event.preventDefault(); $('html, body').animate({ scrollTop: 0 }, 'slow'); }).hide();

    $('a.shipping-value').click( function () { lockBuyButton = true; });

    if ($('.productName').height() > 36) { $('.productName').css('padding-top', '40px'); }

    if ($('#divCompreJunto').children().length)
    {
        bottomLimit = $('#crossupsell').offset().top - 620;
    }
        else
    {
        bottomLimit = $('#info').offset().top - 620;
        $('#info').css({ 'margin-top': '30px' });
    }

    // Include menu on body

    //specialContentImage = 'http://assets.polishop.com.br/landing-page/airfryer/images/airfryer.png';

    //specialContentMenu = [{"title":"Você sabia?","anchor":704},{"title":"Assista ao Filme","anchor":1612},{"title":"O Segredo","anchor":2072},{"title":"Mais Vídeos","anchor":2790},{"title":"Receitas","anchor":3266}]

    //[{"title":"Sucesso Mundial","anchor":737},{"title":"Descubra","anchor":1361},{"title":"Passo a Passo","anchor":1863},{"title":"Todos Detalhes","anchor":2373},{"title":"A Melhor","anchor":3070}]

    if (specialContentMenu !== '')
    {
        $('body').append('<div id="bottomMenu" style="height: 40px; width: 100%; background: #292929; z-index: 9999999; position: fixed; bottom: 0; left: 0; text-align: center;"><div class="menu-content" style="width: 980px; margin: 0 auto; text-align: left;"></div></div>');

        $('#bottomMenu .menu-content').append('<img src="' + specialContentImage + '" style="float: left; width: 162px; margin-top: -35px;" />');

        for (var i = 0; i < specialContentMenu.length; i++)
        {
            $('#bottomMenu .menu-content').append('<a href="#' + specialContentMenu[i].anchor + '" title="' + specialContentMenu[i].title + '" style="color: #f5f5f5; text-decoration: none; font-family: Arial,Helvetica,sans-serif; font-size: 85%; display: block; float: left; height: 40px; line-height: 40px; width: 162px;">&#8597;&nbsp; ' + specialContentMenu[i].title + '</a>');
        }

        $('#bottomMenu a').click( function (event)
        {
            event.preventDefault();
            var topPos = $(this).attr('href').replace('#','');
            $('html, body').stop().animate({ scrollTop: topPos }, 'slow');
        });
    }

    _gaq.push(['_trackEvent', specialContentGA, 'Scroll', 'Nenhum']);

    $(window).scrolled( 250, function ()
    {
        var $scrollTop = $(window).scrollTop();

        if (!lockBuyButton)
        {
            if ($scrollTop < 520)
            {
                $('#buy-side .nome').animate({ 'padding-top' : 0 }, 'fast');
                $('#buy-side .sku, #CalculoDeFrete').show();
                $('.scroll2top').hide();
            }
                else if ($scrollTop > bottomLimit)
            {
                // Do nothing
            }
                else
            {
                var windowTop = $scrollTop - 355;
                $('#buy-side .nome').animate({ 'padding-top' : windowTop }, 'fast');
                $('#buy-side .sku, #CalculoDeFrete').hide();
                $('.scroll2top').show();
            }
        }

        if (isScrollTrackEnabled)
        {
            if ($scrollTop > 0 && $scrollTop < partialContent && !scrollOnStage1Completed)
            {
                _gaq.push(['_trackEvent', specialContentGA, 'Scroll', '1/3 do Conteúdo']);
                scrollOnStage1Completed = true;
            }
                else if ($scrollTop > partialContent && $scrollTop < (partialContent*2) && !scrollOnStage2Completed)
            {
                _gaq.push(['_trackEvent', specialContentGA, 'Scroll', '2/3 do Conteúdo']);
                scrollOnStage2Completed = true;
                if (!scrollOnStage1Completed) {
                _gaq.push(['_trackEvent', specialContentGA, 'Scroll', '1/3 do Conteúdo']);
                scrollOnStage1Completed = true; }
            }
                else if ($scrollTop > (partialContent*2))
            {
                _gaq.push(['_trackEvent', specialContentGA, 'Scroll', 'Todo Conteúdo']);
                if (!scrollOnStage1Completed) {
                _gaq.push(['_trackEvent', specialContentGA, 'Scroll', '1/3 do Conteúdo']); }
                if (!scrollOnStage2Completed) {
                _gaq.push(['_trackEvent', specialContentGA, 'Scroll', '2/3 do Conteúdo']); }
                isScrollTrackEnabled = false;
            }
        }
    });
}

$(document).ready(function()
{
    if ($("body").hasClass("sku") && !$("body").hasClass("servico"))
    {
        var changedLists = 0;

        if ( $('td.Link-do-Especial').exists() )
        {
            activateSpecialContentFullPage();
        }

        $("div.categoryName").appendTo("div#letreiro h2");

        $("#CalculoDeFrete").prepend("<span class='bullet'></span>");

        if ( $('#divCompreJunto').children().size() === 0 )
        {
            $('#crossupsell').remove();
        }

        $("h4.Itens-Inclusos").appendTo("div.Itens");
        $("th.Itens-Inclusos").parent().parent().parent().appendTo("div.Itens");

        $(".sku #produto #info .Tecnicos table th").append(":");
        $("h4.Dados-Tecnicos").next("table").find("th:last").css({ "border-bottom" : "none" });
        $("h4.Dados-Tecnicos").next("table").find("td:last").css({ "border-bottom" : "none" });

        $(".sku #produto #info .Itens table th").append(":");
        $(".sku #produto #info .Itens table th:last").css({ "border-bottom" : "none" });
        $(".sku #produto #info .Itens table td:last").css({ "border-bottom" : "none" });

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

        $("div.topico").each( function ()
        {
            if ( $(this).html() === "" )
            {
                $(this).remove();
            }
        });

        initPayPalButton();

        $(document).ajaxComplete( function ()
        {
            refreshPayPalButton();
        });

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

        $('#Tecnicos').trigger('click');
        $('#crossupsell').css('margin-bottom', '100px');

    }
});
