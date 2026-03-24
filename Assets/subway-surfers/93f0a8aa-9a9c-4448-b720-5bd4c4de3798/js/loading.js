/* eslint-disable prefer-template */
/* eslint-disable func-names */
/* eslint-disable no-var */

function LoadingBar()
{
    var showing = false;
    var total = 0;

    var container = document.createElement('div');

    container.style.position = 'fixed';
    container.style.width = 'min(300px, calc(100% - 128px))';
    container.style.minWidth = '160px';
    container.style.height = '30px';
    container.style.zIndex = 999;

    var base = document.createElement('div');

    base.style.position = 'absolute';
    base.style.width = '100%';
    base.style.height = '100%';
    base.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    container.appendChild(base);

    var bar = document.createElement('div');

    bar.style.position = 'absolute';
    bar.style.left = '4px';
    bar.style.top = '4px';
    bar.style.width = 'calc(100% - 8px)';
    bar.style.height = 'calc(100% - 8px)';
    bar.style.backgroundColor = '#f65000';
    bar.style.transformOrigin = 'left';
    container.appendChild(bar);

    var label = document.createElement('div');

    label.style.position = 'absolute';
    label.style.width = '100%';
    label.style.height = '100%';
    label.style.lineHeight = '30px';
    label.style.textAlign = 'center';
    label.style.color = '#FFFFFF';
    label.style.fontWeight = 'bold';
    label.style.fontSize = '12px';
    label.style.fontFamily = '"Verdana", sans-serif';
    container.appendChild(label);

    function resize()
    {
        container.style.left = '50%';
        container.style.transform = 'translateX(-50%)';
        container.style.top = ((window.innerHeight * 0.5) + 120) + 'px';
    }

    function show()
    {
        if (showing) return;
        showing = true;
        document.body.appendChild(container);
        window.addEventListener('resize', resize);
        setProgress(0);
        resize();
    }

    function hide()
    {
        if (!showing) return;
        showing = false;
        container.remove();
        window.removeEventListener('resize', resize);
    }

    function setTotal(mbs)
    {
        total = mbs;
    }

    function setProgress(ratio)
    {
        if (ratio < 0) ratio = 0;
        if (ratio > 1) ratio = 1;

        var percent = Math.round(ratio * 100) + '%';

        bar.style.transform = 'scaleX(' + ratio + ')';

        if (total)
        {
            var loaded = (total * ratio).toFixed(1);
            var mbs = loaded + '/' + total + ' MB';

            label.innerText = percent + ' - ' + mbs;
        }
        else
        {
            label.innerText = percent;
        }
    }

    show();
    this.show = show;
    this.hide = hide;
    this.setTotal = setTotal;
    this.setProgress = setProgress;
}

window.loadingBar = new LoadingBar();
