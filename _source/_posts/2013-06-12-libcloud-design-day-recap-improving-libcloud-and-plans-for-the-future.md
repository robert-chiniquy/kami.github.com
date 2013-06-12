---
layout: post
title: Libcloud Design Day Recap (improving Libcloud and plans for the future)
published: true
tags:
  - libcloud
  - open source
---

## [{{page.title}}][1]

Yesterday we hosted [Libcloud Design Day and Meetup][2] at the [Rackspace San
Francisco office][3].

This blog post includes a short recap of main topics we covered. It's
assembled mostly from my [Libcloud mailing list post][12].

The goal of the event was to sit down with the [Libcloud][17] users and
developers, indicate current biggest pain points and weaknesses and
brainstorm about possible solutions.

Event was relatively small, but we had a good sample set of Libcloud developers
and user.

<div class="imginline"><a
href="/images/2013-06-12-libcloud-design-day-recap-improving-libcloud-and-plans-for-the-future/lc_design_day.jpg"
class="fancybox" title="Photo taken at the event"><img
src="/images/2013-06-12-libcloud-design-day-recap-improving-libcloud-and-plans-for-the-future/lc_design_day_thumb.jpg"
class="inline"></a><span class="image-caption">Photo taken at the event</span></div>

Here is an incomplete list of people who have attended the event:

* [Paul Querna][5] (of Apache fame, also Libcloud committer)
* [Jed Smith][6] (Libcloud committer)
* [Alex Gaynor][7] (PyPy, Django, Topaz, etc. contributor)
* [Glyph Lefkowitz][8] ([Twisted][16] creator)
* [David Reid][9] (Twisted contributor)
* Chris from [mist.io][10] (mist.io uses Libcloud with many different providers)
* Rick from Google working on the [Google Compute Engine][11] driver

You might recognize some of the names above - we were very happy to have some
very well known and knowledgeable people from the Python world to join us.

### Pricing data distribution

Currently we bundle JSON file with provider pricing data with every release.
There is no documented and easy way for user to update this file or for us to
ship an updated version without releasing a new version of Libcloud.

We should provide easy way to update this file which includes the following:

* Command line tool for updating the file - user can specify a custom URL to
  the file. By default it should point to the latest version from the version
  control ([https://svn.apache.org/viewvc/libcloud/trunk/libcloud/data/pricing.json?view=co][15])
* Modify the code so it also tries to find the default pricing data file in
  `/home/user/.libcloud_data/pricing.json` (or whatever) directory
* Document this process and add it to the documentation page

*Note: Most of code for this functionality already exists
([https://github.com/apache/libcloud/blob/trunk/libcloud/pricing.py][13]). We just
need to add a code for downloading a file from a remote server and the cli
tool.*

### Exception reporting for partial failures in the methods which result in multiple API calls / HTTP requests

Currently we have no standard interface for exceptions which get raised during
a partial failure in a method which has side affects. Partial failure means
that a function which performs multiple API calls failed half way through and
this potentially resulted in some (but not all) resources getting created.

We should provide a special exception for cases like this. This exception
should contain information about resources which got created. Users can then
use this information to perform "rollback" / cleanup partially created
resources.

### Support for async API in the core

Currently we only expose sync / blocking API. This mostly works OK for simple
command line scripts, but it's less than ideal for long running process or
applications which performs a lot of API calls which could be made more
efficient and faster if we supported an async api.

As part of this change we would eventually need to refactor every driver which
would also provide other side benefits such as:

* Code which is more maintainable and easier to test (smaller functions)
* Easier way to handle partial failures / exceptions

We didn't come to a consensus on everything, but we agreed on a couple of
things:

* Change should be backward compatible, we should default to the sync API and
  existing behavior code / shouldn't change
* New async API should be available separately (e.g. under `libcloud.async.*`
  or whatever it ends up being)
* We should refactor internal code to follow new interfaces defined in the
  PEP 3156 ([http://www.python.org/dev/peps/pep-3156/][14])
* We should start with a small scale experiment and try this in a single
  method in a compute driver

### Documentation

We are weak on the documentation side.

Going forward we should strictly enforce that every patch which adds new code
/ functionality contains documentation and appropriate docstrings.

### Migrating to git

We want to make contributing as easy as possible. SVN doesn't help with that
and increases barrier to entry.

Action item here is me opening an Apache Infrastructure ticket for switching to
git.

### Dropping support for Python 2.5

Supporting Python 2.5 adds code complexity which we would like to avoid. Main
problem is that a bunch of CLI tools based on Libcloud usually also run on
older versions of Linux distributions (e.g. RHEL 5) which still ship with
Python 2.5.

We didn't managed to actually talk about this one, but we should explore an
option of removing support for Python 2.5 in the future release.

### Conclusion

Overall the event was fun and productive. We had a lot of good debates and
hopefully a lot of the things we talked about will result in real code and
improvements in the near future :-)

Thanks again to everyone who joined us. If you missed the event or you couldn't
attend, don't worry! You are more than welcome (and encouraged) to join us and
share your opinion and feedback on the [mailing list][12].

[1]: {{ page.url }}
[2]: https://lcdesignday.eventbrite.com
[3]: http://rackertalent.com/sanfrancisco/
[4]: https://libcloud.apache.org/devinfo.html#mailing-lists
[5]: http://journal.paul.querna.org/
[6]: https://github.com/jedsmith/
[7]: http://alexgaynor.net/
[8]: http://glyph.twistedmatrix.com/
[9]: http://dreid.org/
[10]: https://mist.io/
[11]: https://cloud.google.com/products/compute-engine
[12]: https://mail-archives.apache.org/mod_mbox/libcloud-dev/201306.mbox/%3CCAJMHEmLtN9Fskqj5GTc8_Kfro08xjADvtYBSeT7i%3D-iesg%3Durg%40mail.gmail.com%3E
[13]: https://github.com/apache/libcloud/blob/trunk/libcloud/pricing.py
[14]: http://www.python.org/dev/peps/pep-3156/
[15]: https://svn.apache.org/viewvc/libcloud/trunk/libcloud/data/pricing.json?view=co
[16]: https://twistedmatrix.com/trac/
[17]: https://libcloud.apache.org/
