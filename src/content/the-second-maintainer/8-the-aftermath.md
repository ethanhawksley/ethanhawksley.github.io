---
title: '8: The Aftermath'
---

Maintainers of major distros all have access to a private mailing list. Dangerous vulnerabilities get reported here so maintainers can fix them before the discoverer publicly announces it. The typical grace period is 16 days, in which maintainers have to fix the issue and have people update to it. When Andres Freund reported the backdoor in XZ Utils, they only had one day.

Andres Freund detailed everything he had discovered so far, and the maintainers scrambled to get it under control. For many distros, a compromised XZ Utils was already being used by various beta testers, and was mere days away from ordinary users. The latest versions of XZ Utils were replaced within hours by older, trusted versions.

It had been an incredibly close call.


---

The very next day, Andres publicly disclosed the backdoor for all the world to see. He explained where it came from, it's effects, and how to check if you were safe. He also added a disclaimer.

> "I am not a security researcher, nor a reverse engineer."

After all, he wasn't some cybersecurity expert. Andres just enjoyed optimising the performance of databases. Unlike everyone else, he couldn't just ignore 500 milliseconds.

The US federal Cybersecurity and Infrastructure Security Agency was alerted to the exploit, and issued an urgent advisory. They recommended all developers downgrade XZ Utils to version 5.4.6 or older. Many minor Linux distros caught wind and delisted modern versions to protect their users.

Red Hat assigned a severity score of 10.0/10.0 to vulnerability, and published an explanation to their blog detailing everything they knew so far.

GitHub disabled the XZ Utils repository and both Lasse's and Jia's GitHub accounts. This helped prevent the spread of the backdoor, but also prevented researchers from analysing it. Thankfully, Lasse had been hosting a personal copy of the source code on his website, so researchers could continue unimpeded.

---

In an attempt to spread the word, Andres created a series of social media posts where he warned his followers about the backdoor. He also shared some more details behind its discovery, and a warning that he almost missed it.

> "We got unreasonably lucky here, and we can't just bank on that going forward."

His posts spread much further than he could have imagined. Mainstream news outlets picked up on the story: The Economist published an article explaining how the backdoor had been discovered, Wired described how Jia earned trust and became a maintainer of XZ Utils, and The New York Times dug into Andres' past and the aftermath of the exploit. He was invited to numerous interviews and podcasts, and had become an overnight household name in cybersecurity.

When interviewed, he explained how disorienting the whole event was.

> "I’m a fairly private person who just sits in front of the computer and hacks on code."

After all, he was a database developer, not a security expert.

---

As soon as the news of the backdoor broke, Jia fell silent. He stopped responding to emails or creating XZ Utils patches. For all intents and purposes, he had vanished.

When investigators tried to dig into his past, they came up empty handed. He appeared in 2021 and started to contribute code. Before then, there were no traces whatsoever. It wasn't just Jia Tan: Jigar Kumar, Dennis Ens, and Hans Jansen all had no real counterparts. They contributed to XZ Utils and vanished without a trace.

Many government agencies have tried to track down the perpetrators, but none succeeded. The most popular theory is rival governments used these names as pseudonyms. This does have precedent: events such as Russia's 2020 compromise of SolarWinds and the consequential supply chain attack. Even so, this pales in comparison to the stakes of the XZ Utils backdoor. If Andres Freund had missed it, this would have been one of the most catastrophic hacks in history.

---

Lasse Collin was away on holiday when the news broke. He had suspicions about Jia's latest behaviour, but never would have realised the extent to what he was hiding.

He initially tried logging into his GitHub account, but discovered his account had been disabled. Instead, he turned his attention to the Linux mailing list and began to write an email.

> "I'm on holiday and only happened to look at my emails, and it seems to be a major mess.
>
> My proper investigation efforts likely start in the first days of April. That is, I currently know only a few facts which alone are bad enough."

Lasse stopped forwarding XZ Utils mail to Jia, and removed Jia from the Tukaani Project. Nonetheless, he didn't let it spoil the rest of his holiday.

When he returned home, Lasse immediately got back to work. He persuaded GitHub to reinstate his account, and after a week they enabled the XZ Utils repository again. Then started the tedious part - reviewing every patch that Jia ever made, and he noted down anything suspicious or out of the ordinary. What shocked him was how, even with hindsight, it was remarkably benign. Jia's contributions fixed plenty of bugs and added some very useful features.

It took Lasse two months, but he finally reviewed all of Jia's code and purged the backdoor from XZ Utils. He even revived Bob the Toucan as the mascot. The project was finally safe with 5.6.2.

Now that Jia was gone, he decided to onboard a second maintainer to assist with development. Sam James - a developer of the Gentoo Linux distro - volunteered himself and was accepted after some vetting. Lets just hope this time, history will not repeat itself...
